import * as React from "react";
import * as ReactDOM from "react-dom";
import pnp, { CamlQuery, Web } from "sp-pnp-js";
import * as moment from "moment";
import { Carousel } from "react-responsive-carousel";
import styles from './IntranetComponent.module.scss';

export interface IIntranetComponentProps { }

export interface IIntranetComponentstate {
  showNotifications: boolean;
  loading: boolean;
  notificationItems: any;
  noItems: boolean;
}

export default class IntranetComponent extends React.Component<
  IIntranetComponentProps,
  IIntranetComponentstate
  > {
  constructor(props: IIntranetComponentProps, state: IIntranetComponentstate) {
    super(props);

    let showAlerts = true;
    let notes = "This is a notification";

    this.state = {
      showNotifications: showAlerts,
      loading: true,
      notificationItems: [],
      noItems: false,
    };
  }

  public render() {
    if (!this.state.noItems) {
      if (this.state.loading) {
        return (React.createElement('div', { class: styles.top }, "Loading Notification items"));
      }
      else {
        return (
          <div>
            <Carousel
              showArrows={false}
              showThumbs={false}
              autoPlay   
              showStatus = {false}  
              showIndicators ={true}                       
              infiniteLoop={true}
            >
              {this.state.notificationItems.map((name) => (
                <div key={name.Title} style={{ padding:"15px 0 35px 0", color: "#fff", backgroundColor:"#00385c" }}>
                  {name.Title}
                </div>
              ))}
            </Carousel>
          </div>
        );
      }
    } else {
      return (React.createElement('div', { class: styles.top }));
    }
  }

  private getItemsFromSP() {
    let myWeb = new Web("https://m365x830159.sharepoint.com/");

    let currentTime = moment(new Date());
    let items = [];

    // query Notifications List
    let xml =
      "<View><ViewFields><FieldRef Name='Title' /></ViewFields><Query>";
    xml +=
      "<Where><And><Leq><FieldRef Name='EffectiveStartDate' /><Value IncludeTimeValue='TRUE' Type='DateTime'>" +
      currentTime.utc(true).toISOString() +
      "</Value></Leq>";
    xml +=
      "<Geq><FieldRef Name='EffectiveEndDate' /><Value IncludeTimeValue='TRUE' Type='DateTime'>" +
      currentTime.utc(true).toISOString() +
      "</Value></Geq></And></Where>";
    xml += "</Query></View>";

    const q: CamlQuery = {
      ViewXml: xml,
    };

    myWeb.lists
      .getByTitle("Notifications")
      .getItemsByCAMLQuery(q)
      .then((alerts: any[]) => {
        for (let a of alerts) {
          items.push(a);
        }
        if (alerts.length > 0) {
          this.setState({ notificationItems: items, loading: false, noItems: false });
        }
        else {
          this.setState({ notificationItems: items, loading: false, noItems: true });
        }
      })
      .catch((error: any) => {
        let e = error;
      });
  }

  public componentDidMount() {
    this.getItemsFromSP();
  }

}

