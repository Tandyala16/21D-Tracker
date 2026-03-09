import { useState, useEffect, useCallback, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LOGICAL_REASONING, QUANTITATIVE_APTITUDE, DSA_TOPICS, CORE_CS, STORAGE_KEY } from "./constants/data";
import { load, save } from "./utils/storage";

import { Navigation } from "./components/layout/Navigation";
import { Dashboard } from "./components/views/Dashboard";
import { HourlyView } from "./components/views/HourlyView";
import { AptitudeView } from "./components/views/AptitudeView";
import { DSAView } from "./components/views/DSAView";
import { CoreCSView } from "./components/views/CoreCSView";
import { WeeklyView } from "./components/views/WeeklyView";
import { SettingsView } from "./components/views/SettingsView";
import { AuthView } from "./components/views/AuthView";

import { supabase } from "./lib/supabase";

export default function App() {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);

    const [statusMap, setStatusMap] = useState(() => load(STORAGE_KEY + "_status", {}));
    const [kpiMap, setKpiMap] = useState(() => load(STORAGE_KEY + "_kpi", {}));
    const [hourly, setHourly] = useState(() => load(STORAGE_KEY + "_hourly", {}));
    const [counters, setCounters] = useState(() => load(STORAGE_KEY + "_counters", { appsToday: 0, appsTotal: 0, leetToday: 0, leetTotal: 0, aptToday: 0, mocks: 0, interviews: 0 }));
    const [notes, setNotes] = useState(() => { try { return localStorage.getItem(STORAGE_KEY + "_notes") || ""; } catch { return ""; } });
    const [streakHistory, setStreakHistory] = useState(() => load(STORAGE_KEY + "_streak_history", []));

    // Daily Reset state tracking
    const [lastReset, setLastReset] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY + "_last_reset");
        return stored || new Date().toDateString(); // Default to today if new
    });

    // Mission Timeline tracking
    const [missionStart, setMissionStart] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY + "_mission_start");
        return stored ? new Date(stored) : new Date(); // Start clock today if undefined
    });

    // 1. Auth Subscription
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setAuthLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setAuthLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // 2. Hydration (Download from cloud on login)
    useEffect(() => {
        if (!user) {
            setIsHydrated(false);
            return;
        }

        const fetchUserData = async () => {
            const { data, error } = await supabase
                .from('user_data')
                .select('state_json')
                .eq('user_id', user.id)
                .maybeSingle();

            if (data && data.state_json && Object.keys(data.state_json).length > 0) {
                console.log("Hydrating from Supabase...");
                const cloudData = data.state_json;

                try {
                    if (cloudData[STORAGE_KEY + "_status"]) setStatusMap(JSON.parse(cloudData[STORAGE_KEY + "_status"]));
                    if (cloudData[STORAGE_KEY + "_kpi"]) setKpiMap(JSON.parse(cloudData[STORAGE_KEY + "_kpi"]));
                    if (cloudData[STORAGE_KEY + "_hourly"]) setHourly(JSON.parse(cloudData[STORAGE_KEY + "_hourly"]));
                    if (cloudData[STORAGE_KEY + "_counters"]) setCounters(JSON.parse(cloudData[STORAGE_KEY + "_counters"]));
                    if (cloudData[STORAGE_KEY + "_notes"]) setNotes(cloudData[STORAGE_KEY + "_notes"]);
                    if (cloudData[STORAGE_KEY + "_streak_history"]) setStreakHistory(JSON.parse(cloudData[STORAGE_KEY + "_streak_history"]));
                    if (cloudData[STORAGE_KEY + "_last_reset"]) setLastReset(cloudData[STORAGE_KEY + "_last_reset"]);
                    if (cloudData[STORAGE_KEY + "_mission_start"]) setMissionStart(new Date(cloudData[STORAGE_KEY + "_mission_start"]));

                    for (let key in cloudData) {
                        localStorage.setItem(key, typeof cloudData[key] === 'string' ? cloudData[key] : JSON.stringify(cloudData[key]));
                    }
                } catch (e) {
                    console.error("Hydration Error:", e);
                }
            }

            // Unlock syncing and UI rendering ONLY AFTER hydration finishes
            setIsHydrated(true);
        };
        fetchUserData();
    }, [user]);

    // Track first load to prevent overwriting cloud with empty local state initially
    const isFirstRun = useRef(true);

    useEffect(() => { save(STORAGE_KEY + "_status", statusMap); }, [statusMap]);
    useEffect(() => { save(STORAGE_KEY + "_kpi", kpiMap); }, [kpiMap]);
    useEffect(() => { save(STORAGE_KEY + "_hourly", hourly); }, [hourly]);
    useEffect(() => { save(STORAGE_KEY + "_counters", counters); }, [counters]);
    useEffect(() => { try { localStorage.setItem(STORAGE_KEY + "_notes", notes); } catch { } }, [notes]);
    useEffect(() => { save(STORAGE_KEY + "_streak_history", streakHistory); }, [streakHistory]);
    useEffect(() => { try { localStorage.setItem(STORAGE_KEY + "_last_reset", lastReset); } catch { } }, [lastReset]);
    useEffect(() => { try { localStorage.setItem(STORAGE_KEY + "_mission_start", missionStart.toISOString()); } catch { } }, [missionStart]);

    // 3. Sync to Cloud (Debounced)
    useEffect(() => {
        if (!user || !isHydrated) return; // CRITICAL: Stop sync completely until hydration unlocks

        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        const syncToCloud = async () => {
            const currentData = {
                [STORAGE_KEY + "_status"]: JSON.stringify(statusMap),
                [STORAGE_KEY + "_kpi"]: JSON.stringify(kpiMap),
                [STORAGE_KEY + "_hourly"]: JSON.stringify(hourly),
                [STORAGE_KEY + "_counters"]: JSON.stringify(counters),
                [STORAGE_KEY + "_notes"]: notes,
                [STORAGE_KEY + "_streak_history"]: JSON.stringify(streakHistory),
                [STORAGE_KEY + "_last_reset"]: lastReset,
                [STORAGE_KEY + "_mission_start"]: missionStart.toISOString()
            };

            // Check if row exists (Because user_id might not have a UNIQUE constraint, upsert fails)
            const { data: existingRow, error: checkError } = await supabase
                .from('user_data')
                .select('id')
                .eq('user_id', user.id)
                .maybeSingle();

            if (checkError) {
                console.error("Sync Check Error:", checkError);
                return;
            }

            if (existingRow) {
                // Update existing row
                const { error: updateError } = await supabase
                    .from('user_data')
                    .update({ state_json: currentData })
                    .eq('id', existingRow.id);
                if (updateError) console.error("Sync Update Error:", updateError);
            } else {
                // Insert new row
                const { error: insertError } = await supabase
                    .from('user_data')
                    .insert({ user_id: user.id, state_json: currentData });
                if (insertError) console.error("Sync Insert Error:", insertError);
            }
        };

        const timeoutId = setTimeout(syncToCloud, 2000);
        return () => clearTimeout(timeoutId);

    }, [user, isHydrated, statusMap, kpiMap, hourly, counters, notes, streakHistory, lastReset, missionStart]);


    // Calculate elapsed mission days (1-indexed base)
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const mStart = new Date(missionStart);
    mStart.setHours(0, 0, 0, 0);
    const diffMs = now.getTime() - mStart.getTime();
    // +1 because the first day is Day 1
    const elapsedDays = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1);

    // Daily Reset Automation Engine
    useEffect(() => {
        const todayStr = new Date().toDateString();
        if (lastReset !== todayStr) {
            // It's a brand new calendar day! Let's clean the slate.

            // 1. Clear hourly checkboxes
            setHourly({});

            // 2. Clear notes
            setNotes("");

            // 3. Reset "Today" counters but preserve "Total" and permanent counters
            setCounters(prev => ({
                ...prev,
                leetToday: 0,
                appsToday: 0,
                aptToday: 0
            }));

            // 4. Update the reset timer so this only runs once today
            setLastReset(todayStr);
            console.log("🧹 Daily reset completed for:", todayStr);
        }
    }, [lastReset]); // Run on mount and if lastReset gets artificially changed

    // Calculate goals achieved for today
    const countGoalsAchieved = useCallback(() => {
        // 1. Mastery
        const masteredCount = LOGICAL_REASONING.filter(t => statusMap[t.id] === 2).length + QUANTITATIVE_APTITUDE.filter(t => statusMap[t.id] === 2).length + DSA_TOPICS.filter(t => statusMap[t.id] === 2).length + CORE_CS.filter(t => statusMap[t.id] === 2).length;

        // 2. Hourly completion
        const hourlyDone = Object.values(hourly).filter(Boolean).length;

        // 3 & 4. Daily counters
        const lcToday = counters.leetToday || 0;
        const appsToday = counters.appsToday || 0;

        return {
            masteredCount,
            hourlyDone,
            lcToday,
            appsToday
        };
    }, [statusMap, hourly, counters]);

    useEffect(() => {
        // Evaluate if minimum goals are met dynamically
        const metrics = countGoalsAchieved();
        const goalMet = metrics.hourlyDone >= 2 || metrics.lcToday >= 1 || metrics.appsToday >= 1 || metrics.masteredCount >= 1;
        const todayStr = new Date().toDateString();

        setStreakHistory(prev => {
            const history = [...prev];
            const hasToday = history.includes(todayStr);

            if (goalMet && !hasToday) {
                // Goal met, but not in history. Add it and sort.
                return [...history, todayStr].sort((a, b) => new Date(a) - new Date(b));
            } else if (!goalMet && hasToday) {
                // Undo penalty: Goal falls below threshold, remove today from history.
                return history.filter(d => d !== todayStr);
            }
            return history;
        });
    }, [countGoalsAchieved]);

    // Derived stat calculations (calculate dynamic streak on the fly)
    const derivedStreak = { current: 0, max: 0 };
    if (streakHistory && streakHistory.length > 0) {
        let currentTemp = 1;
        let maxTemp = 1;

        for (let i = 1; i < streakHistory.length; i++) {
            const currDate = new Date(streakHistory[i]);
            currDate.setHours(0, 0, 0, 0);
            const prevDate = new Date(streakHistory[i - 1]);
            prevDate.setHours(0, 0, 0, 0);

            const diffDays = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                currentTemp++;
            } else if (diffDays > 1) {
                currentTemp = 1;
            }
            maxTemp = Math.max(maxTemp, currentTemp);
        }

        const todayStr = new Date().toDateString();
        const yest = new Date();
        yest.setDate(yest.getDate() - 1);
        const yestStr = yest.toDateString();

        const latest = streakHistory[streakHistory.length - 1];
        if (latest === todayStr || latest === yestStr) {
            derivedStreak.current = currentTemp;
        } else {
            derivedStreak.current = 0; // Missed yesterday completely, current streak resets.
        }
        derivedStreak.max = maxTemp;
    }

    const toggleStatus = useCallback((id) => {
        setStatusMap(p => ({ ...p, [id]: ((p[id] || 0) + 1) % 3 }));
    }, []);

    const toggleKpi = useCallback((id) => {
        setKpiMap(p => ({ ...p, [id]: !p[id] }));
    }, []);

    const totalTopicsCount = LOGICAL_REASONING.length + QUANTITATIVE_APTITUDE.length + DSA_TOPICS.length + CORE_CS.length;
    const masteredTopicsCount = LOGICAL_REASONING.filter(t => statusMap[t.id] === 2).length + QUANTITATIVE_APTITUDE.filter(t => statusMap[t.id] === 2).length + DSA_TOPICS.filter(t => statusMap[t.id] === 2).length + CORE_CS.filter(t => statusMap[t.id] === 2).length;
    const headerPct = Math.round((masteredTopicsCount / totalTopicsCount) * 100) || 0;

    if (authLoading) {
        return <div className="min-h-screen flex items-center justify-center text-white bg-[#0e0e1a]">Loading...</div>;
    }

    if (!user) {
        return <AuthView />;
    }

    if (!isHydrated) {
        return (
            <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-[#0a0a14]">
                <div className="text-[40px] animate-bounce">🎯</div>
                <div className="font-syne font-bold text-sm tracking-wide text-[#3b82f6] animate-pulse">Syncing with Mission Control...</div>
            </div>
        );
    }

    return (
        <div>
            <Navigation headerPct={headerPct} streak={derivedStreak} elapsedDays={elapsedDays} />

            <div className="max-w-[960px] mx-auto py-5 px-3 sm:px-6 md:py-8">
                <Routes>
                    <Route path="/" element={<Dashboard statusMap={statusMap} kpiMap={kpiMap} counters={counters} hourly={hourly} streak={derivedStreak} elapsedDays={elapsedDays} />} />
                    <Route path="/hourly" element={<HourlyView hourly={hourly} setHourly={setHourly} counters={counters} setCounters={setCounters} notes={notes} setNotes={setNotes} />} />
                    <Route path="/aptitude" element={<AptitudeView statusMap={statusMap} onToggleStatus={toggleStatus} counters={counters} setCounters={setCounters} />} />
                    <Route path="/dsa" element={<DSAView statusMap={statusMap} onToggleStatus={toggleStatus} counters={counters} setCounters={setCounters} />} />
                    <Route path="/cs" element={<CoreCSView statusMap={statusMap} onToggleStatus={toggleStatus} />} />
                    <Route path="/weekly" element={<WeeklyView kpiMap={kpiMap} onToggle={toggleKpi} counters={counters} setCounters={setCounters} />} />
                    <Route path="/settings" element={<SettingsView />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </div>
    );
}
