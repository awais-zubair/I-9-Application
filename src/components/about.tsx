import * as React from "react";
import {Component} from "react";
import "../styles/about.css";
import {browserName} from "react-device-detect";
import AppContext from "../contexts/app-context";

export default class About extends Component {
    private readonly userAgent: string;
    static contextType = AppContext;

    constructor(props: Record<string, unknown>) {
        super(props);
        this.userAgent = navigator.userAgent;
    }

    componentDidMount() {
        console.log("About loaded");
    }

    private getOs(agent: string): string {
        let result = agent.substring(agent.indexOf("(") + 1);
        return result.substring(0, result.indexOf(")"));
    }

    private getVersion(agent: string): string {
        switch (browserName) {
            case "Chrome":
                return agent.substring(agent.indexOf("Chrome/") + 7).split(" ")[0];
            case "Firefox":
                return agent.substring(agent.indexOf("Firefox/") + 8).split(" ")[0];
            case "Edge":
                return agent.substring(agent.indexOf("Edg/") + 4).split(" ")[0];
            case "Safari":
                return agent.substring(agent.indexOf("Safari/") + 7).split(" ")[0];
            default:
                return agent;
        }
    }

    private onClick(event: React.MouseEvent): void {
        event.stopPropagation();
    }

    render() {
        let published = new Date();
        published.setUTCDate(published.getUTCDate() - 45);
        return (
            <React.Fragment>
                <div className="about-outer" onClick={event => this.onClick(event)}>
                    <div className="about-title">
                        <h2 className="about-caption">About I-9 Application </h2>
                    </div>
                    <div className="about-content">
                        <div className="about-entries">
                            <div className="about-entry">
                                <label className="about-label">Version:</label>
                                <label className="about-value">1.03.15.3648</label>
                            </div>
                            <div className="about-entry">
                                <label className="about-label">Published:</label>
                                <label className="about-value">{published?.toLocaleDateString(this.context.locale)}</label>
                            </div>
                            <div className="about-entry">
                                <label className="about-label">OS:</label>
                                <label className="about-value">{this.getOs(this.userAgent)}</label>
                            </div>
                            <div className="about-entry">
                                <label className="about-label">Browser:</label>
                                <label className="about-value">{browserName}</label>
                            </div>
                            <div className="about-entry">
                                <label className="about-label">Version:</label>
                                <label className="about-value">{this.getVersion(this.userAgent)}</label>
                            </div>
                            <div className="about-entry">
                                <label className="about-label">Logins:</label>
                                <label className="about-value">{1234567.89.toLocaleString(this.context.locale)}</label>
                            </div>
                            <div className="about-legal">
                                <div>© 2022 Automatic Data Processing, Inc. along with its subsidiaries and affiliates. All Rights Reserved.
                                    This software is the confidential and proprietary information of Automatic Data Processing, Inc. and is
                                    protected by trade secret and copyright law. This software and all related rights are the exclusive property
                                    of Automatic Data Processing, Inc. All use, modification, reproduction, release, performance, display and/or
                                    disclosure is governed by the license terms of Automatic Data Processing, Inc.
                                </div>
                                <br/>
                                <div><b>Terms and Conditions</b></div>
                                <br/>
                                <div>Automatic Data Processing, Inc. along with its subsidiaries and affiliates (&quot;ADP&quot;), provides the information
                                    and services on its World Wide Web site(s) (the &quot;Site&quot;) under the following terms and conditions (the “Terms”).
                                    By accessing and/or using the Site, you indicate your acceptance of these Terms. By using our Site, you agree
                                    to not knowingly circumvent, evade, or fail to comply with all applicable Terms to the extent that they apply to
                                    you.
                                </div>
                                <br/>
                                <div>
                                    <a href="https://www.adp.com/legal.aspx#:~:text=Users%20may%20not%20modify%2C%20copy,for%20commercial%20or%20public%20purposes."
                                       target="_blank" rel="noreferrer">
                                        Full terms and conditions
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}
