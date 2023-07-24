import {VictoryPie} from "victory-pie";
import classes from "../styles/auditor-dash.module.css";
import {LogService} from "../services/log-service";
import {useEffect, useState} from "react";
import {Point} from "../props/point";
import {VictoryBar} from "victory-bar";
import {Helpers} from "../shared/helpers";
import {ProcessDays} from "../props/process-days";
import Spinner from "./spinner";

export default function AuditorDash(): JSX.Element {
    const [counts, setCounts] = useState([new Point("", 0)]);
    const [volumes, setVolumes] = useState([new Point("", 0)]);
    const [region, setRegion] = useState("");
    const [regions, setRegions] = useState(new Array<string>());
    const [dayCounts, setDayCounts] = useState(new Array<ProcessDays>());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        LogService.getPeriodCounts().then(counts => {
            setLoading(false);
            setDayCounts(counts);
            let regions = Helpers.distinct<string>(counts.map(point => point.region))
                .sort((first, second) => Helpers.greaterThan(first, second));
            setRegions(regions);
            loadCounts(counts);
            loadVolumes(counts);
        });
    }, []);

    function onChangeRegion(region: string): void {
        setRegion(region);
        let totalMap = new Map<number, number>();
        let selected = region ? dayCounts.filter(count => count.region === region) : dayCounts;
        selected.forEach(point => {
            let total = totalMap.get(point.count);
            totalMap.set(point.count, total ? total + 1 : 1);
        });
        let counts: Point[] = [];
        totalMap.forEach((value, key) => counts[key] = new Point(`${key + 1} day`, value));
        setCounts(counts);
    }

    function loadCounts(dayCounts: ProcessDays[]): void {
        let totalMap = new Map<number, number>();
        dayCounts.forEach(point => {
            let total = totalMap.get(point.count);
            totalMap.set(point.count, total ? total + 1 : 1);
        });
        let counts: Point[] = [];
        totalMap.forEach((value, key) => counts[key] = new Point(`${key + 1} day`, value));
        setCounts(counts);
    }

    function loadVolumes(dayCounts: ProcessDays[]): void {
        let volumeMap = new Map<string, number>();
        dayCounts.forEach(point => {
            let volume = volumeMap.get(point.region);
            volumeMap.set(point.region, volume ? volume + 1 : 1);
        });
        let volumes: Point[] = [];
        let index = 0;
        volumeMap.forEach((value, key) => volumes[index++] = new Point(key, value));
        setVolumes(volumes);
    }

    return (
        <div>
            <div className={classes.outer}>
                <div className={classes.panel}>
                    <span className={classes.caption}>Form Processing Time</span>
                    <div className={classes.chart}>
                        <Spinner loading={loading}/>
                        <div className={loading ? classes.loading : classes.loaded}>
                            <VictoryPie data={counts} colorScale={["darkolivegreen", "limegreen", "gold", "darksalmon", "coral", "crimson"]} radius={100}/>
                        </div>
                     </div>
                    <div className={classes.regions}>
                        <select className={classes.combo} onChange={e => onChangeRegion(e.target.value)} value={region}>
                            <option key={""} value={""}>All regions</option>
                            {regions.map(region => <option key={region} value={region}>{region}</option>)}
                        </select>
                    </div>
                </div>
                <div className={classes.panel}>
                    <span className={classes.caption}>Regional Volumes</span>
                    <div className={classes.chart}>
                        <Spinner loading={loading}/>
                        <div className={loading ? classes.loading : classes.loaded}>
                            <VictoryBar horizontal data={volumes} style={{data: {fill: "#5f9ea0"}}} barRatio={0.8} labels={({datum}) => datum.x}
                                    domainPadding={{y: [0, 70]}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
