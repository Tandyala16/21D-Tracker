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
    const [cloudError, setCloudError] = useState(null);

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

    // Helper to safely apply an unstructured JSON payload to all React States
    const applyStateFromData = (dataObj) => {
        try {
            if (dataObj[STORAGE_KEY + "_status"]) setStatusMap(JSON.parse(dataObj[STORAGE_KEY + "_status"]));
            else setStatusMap({});

            if (dataObj[STORAGE_KEY + "_kpi"]) setKpiMap(JSON.parse(dataObj[STORAGE_KEY + "_kpi"]));
            else setKpiMap({});

            if (dataObj[STORAGE_KEY + "_hourly"]) setHourly(JSON.parse(dataObj[STORAGE_KEY + "_hourly"]));
            else setHourly({});

            if (dataObj[STORAGE_KEY + "_counters"]) setCounters(JSON.parse(dataObj[STORAGE_KEY + "_counters"]));
            else setCounters({ appsToday: 0, appsTotal: 0, leetToday: 0, leetTotal: 0, aptToday: 0, mocks: 0, interviews: 0 });

            if (dataObj[STORAGE_KEY + "_notes"]) setNotes(dataObj[STORAGE_KEY + "_notes"]);
            else setNotes("");

            if (dataObj[STORAGE_KEY + "_streak_history"]) setStreakHistory(JSON.parse(dataObj[STORAGE_KEY + "_streak_history"]));
            else setStreakHistory([]);

            if (dataObj[STORAGE_KEY + "_last_reset"]) setLastReset(dataObj[STORAGE_KEY + "_last_reset"]);
            else setLastReset(new Date().toDateString());

            if (dataObj[STORAGE_KEY + "_mission_start"]) setMissionStart(new Date(dataObj[STORAGE_KEY + "_mission_start"]));
            else setMissionStart(new Date());

            for (let key in dataObj) {
                localStorage.setItem(key, typeof dataObj[key] === 'string' ? dataObj[key] : JSON.stringify(dataObj[key]));
            }
        } catch (e) {
            console.error("State Parse Error:", e);
            setCloudError("Parse Error: " + e.message);
        }
    };

    const handleHardReset = async () => {
        applyStateFromData({}); // Wipes local state

        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key.startsWith(STORAGE_KEY)) {
                localStorage.removeItem(key);
            }
        }

        if (user) {
            const { error } = await supabase.from('user_data').delete().eq('user_id', user.id);
            if (error) setCloudError("Supabase Delete Error: " + error.message);
        }
    };

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

            if (error) {
                setCloudError("Supabase Download Error: " + error.message);
            }

            if (data && data.state_json && Object.keys(data.state_json).length > 0) {
                console.log("Hydrating from Supabase...");
                applyStateFromData(data.state_json);
                setCloudError(null);
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
                setCloudError("Supabase Sync Check Error: " + checkError.message);
                return;
            }

            if (existingRow) {
                // Update existing row
                const { error: updateError } = await supabase
                    .from('user_data')
                    .update({ state_json: currentData })
                    .eq('id', existingRow.id);
                if (updateError) setCloudError("Supabase Update Error: " + updateError.message);
                else setCloudError(null);
            } else {
                // Insert new row
                const { error: insertError } = await supabase
                    .from('user_data')
                    .insert({ user_id: user.id, state_json: currentData });
                if (insertError) setCloudError("Supabase Insert Error: " + insertError.message);
                else setCloudError(null);
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

    const handleCounterChange = useCallback((key, delta) => {
        setCounters(p => {
            const currentVal = p[key] || 0;
            const newVal = Math.max(0, currentVal + delta);
            if (newVal === currentVal) return p;

            const res = { ...p, [key]: newVal };

            // Bidirectional Syncing: Modifying "Today" updates the "Total", and vice-versa
            if (key === "appsToday") res.appsTotal = Math.max(0, (p.appsTotal || 0) + delta);
            if (key === "appsTotal") res.appsToday = Math.max(0, (p.appsToday || 0) + delta);

            if (key === "leetToday") res.leetTotal = Math.max(0, (p.leetTotal || 0) + delta);
            if (key === "leetTotal") res.leetToday = Math.max(0, (p.leetToday || 0) + delta);

            return res;
        });
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

    const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Explorer';

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
            {cloudError && (
                <div className="bg-red-500 text-white font-bold p-3 text-sm text-center fixed top-0 w-full z-[999] shadow-lg flex items-center justify-between">
                    <div>🚨 DATABASE ERROR: {cloudError} 🚨</div>
                    <button onClick={() => setCloudError(null)} className="px-3 bg-red-700 rounded hover:bg-red-800">Dismiss</button>
                </div>
            )}
            <div className={cloudError ? "pt-12" : ""}>
                <Navigation headerPct={headerPct} streak={derivedStreak} elapsedDays={elapsedDays} userName={userName} />

                <div className="max-w-[960px] mx-auto py-5 px-3 sm:px-6 md:py-8">
                    <Routes>
                        <Route path="/" element={<Dashboard statusMap={statusMap} kpiMap={kpiMap} counters={counters} hourly={hourly} streak={derivedStreak} elapsedDays={elapsedDays} streakHistory={streakHistory} missionStart={missionStart} />} />
                        <Route path="/hourly" element={<HourlyView hourly={hourly} setHourly={setHourly} counters={counters} setCounters={setCounters} onUpdateCounter={handleCounterChange} notes={notes} setNotes={setNotes} userName={userName} />} />
                        <Route path="/aptitude" element={<AptitudeView statusMap={statusMap} onToggleStatus={toggleStatus} counters={counters} setCounters={setCounters} onUpdateCounter={handleCounterChange} />} />
                        <Route path="/dsa" element={<DSAView statusMap={statusMap} onToggleStatus={toggleStatus} counters={counters} setCounters={setCounters} onUpdateCounter={handleCounterChange} />} />
                        <Route path="/cs" element={<CoreCSView statusMap={statusMap} onToggleStatus={toggleStatus} />} />
                        <Route path="/weekly" element={<WeeklyView kpiMap={kpiMap} onToggle={toggleKpi} counters={counters} setCounters={setCounters} onUpdateCounter={handleCounterChange} />} />
                        <Route path="/settings" element={<SettingsView onRestore={applyStateFromData} onHardReset={handleHardReset} />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
