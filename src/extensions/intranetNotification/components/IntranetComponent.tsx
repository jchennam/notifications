import * as React from 'react';
import * as ReactDOM from 'react-dom';
// @ts-ignore
import ReactTextRotator from 'react-text-rotator';
import pnp, { CamlQuery, Web } from 'sp-pnp-js';
import * as moment from "moment";
import styles from './IntranetComponent.module.scss';
// @ts-ignore
import Marquee from "react-double-marquee";
//import MarqueeDouble from 'react-marquee-double';
import TextLoop from "react-text-loop";


export interface IIntranetComponentProps{
}

export interface IIntranetComponentstate{
    showNotifications: boolean;
    loading: boolean;
    notificationItems: any;
}

export default class IntranetComponent extends React.Component<IIntranetComponentProps, IIntranetComponentstate> {

    constructor(props: IIntranetComponentProps, state: IIntranetComponentstate) {
        super(props);

        let showAlerts = true;
        let notes = "This is a notification";

        this.state = {
            showNotifications: showAlerts,
            loading: false,
            notificationItems: []
        };

       /*  if (showAlerts)
        this.getNotifications(); */
    }

    public render() {
  
        if (this.state.showNotifications) {
         
            if (this.state.loading){
                return (<span>still loading....</span>);
            }
            else {

                //const messages = this.getNotificationItems();
                
      let myWeb = new Web("https://m365x830159.sharepoint.com/");
     
      let msgBars: Array<React.ReactElement<any>> = [];
      let currentTime = moment(new Date());
      let items = [];
      let notificationsId : any;
      let contents = [];
      // query Notifications List
      let xml = "<View><ViewFields><FieldRef Name='Title' /></ViewFields><Query>";
      xml += "<Where><And><Leq><FieldRef Name='EffectiveStartDate' /><Value IncludeTimeValue='TRUE' Type='DateTime'>" + currentTime.utc(true).toISOString() + "</Value></Leq>";
      xml += "<Geq><FieldRef Name='EffectiveEndDate' /><Value IncludeTimeValue='TRUE' Type='DateTime'>" + currentTime.utc(true).toISOString() + "</Value></Geq></And></Where>";
      xml += "</Query></View>";

      const q: CamlQuery = {
        ViewXml: xml,
      };
  
      myWeb.lists.getByTitle("Notifications").getItemsByCAMLQuery(q).then((alerts: any[]) => {

        for (let a of alerts) {
          items.push(a);
        }
  
        this.setState({ notificationItems: items, loading: false });
        
      }).catch((error: any) => {
  
        let e = error;
  
      });
    
        for (let i of this.state.notificationItems) { 

          const content = i.Title;
           //const content = <Marquee autoStart={true} scrolldelay={500} direction={'left'} childMargin={45}>{i.Title}</Marquee>;
           contents.push(content);
        }
          const notifications = <Marquee autoStart={true} scrolldelay={500} direction={'left'} childMargin={45}>{contents}</Marquee>;
          const container = React.createElement('div', {class: styles.top}, notifications);  
          return container;
          //console.log(container); 
          
        /*  return (
          <div
            style={{
              whiteSpace: 'nowrap',
              width:'200px',             
            }}
          >
            <Marquee>
              Some really really really really really long text
            </Marquee>
          </div>
        );   */                      
            }
        }
        else {
          return (<span>No Items found...</span>);
        }
    }
  }
   /*  private getNotifications() {

      let currentTime = moment(new Date());

      // query Notifications List
      let xml = "<View><ViewFields><FieldRef Name='Title' /></ViewFields><Query>";
      xml += "<Where><And><Leq><FieldRef Name='EffectiveStartDate' /><Value IncludeTimeValue='TRUE' Type='DateTime'>" + currentTime.utc(true).toISOString() + "</Value></Leq>";
      xml += "<Geq><FieldRef Name='EffectiveEndDate' /><Value IncludeTimeValue='TRUE' Type='DateTime'>" + currentTime.utc(true).toISOString() + "</Value></Geq></And></Where>";
      xml += "</Query></View>";

      const q: CamlQuery = {
        ViewXml: xml,
      };

      pnp.sp.web.lists.getByTitle("Notifications").getItemsByCAMLQuery(q).then((alerts: any[]) => {

        let items = [];
  
        for (let a of alerts) {
          items.push(a);
        }
  
        this.setState({ notificationItems: items, loading: false });
        console.log(this.getNotificationItems);
      }).catch((error: any) => {
  
        let e = error;
  
      });
    /*  let web = new Web('https://m365x830159.sharepoint.com').lists.getByTitle('Notifications').items.select('Title').get();
      // web.getList("https://m365x830159.sharepoint.com/Lists/Notifications").get()
      console.log(web);
      pnp.sp.web.lists.getByTitle('Notifications').items.select('Title').get().then ((alerts : any[]) => {
        for (let a of alerts) {
          items.push(a);
        }
        debugger;
        console.log(items);
       pnp.sp.site. openWebById('05184f34-3d27-4e0b-a534-67562624544e').then(w =>{
        w.web.lists.getByTitle('Notifications').items.select('Title').get().then ((alerts : any[]) => {
          for (let a of alerts) {
            items.push(a);
          }
          debugger;
          console.log(items);

        }) 

        this.setState({notificationItems: items, loading: false});
      }); */ 
    ////}

    /*private getNotificationItems() {

      let myWeb = new Web("https://m365x830159.sharepoint.com/");
     
      let msgBars: Array<React.ReactElement<any>> = [];
      let currentTime = moment(new Date());
      let items = [];
      let notificationsId : any;
      let contents = [];
      // query Notifications List
      let xml = "<View><ViewFields><FieldRef Name='Title' /></ViewFields><Query>";
      xml += "<Where><And><Leq><FieldRef Name='EffectiveStartDate' /><Value IncludeTimeValue='TRUE' Type='DateTime'>" + currentTime.utc(true).toISOString() + "</Value></Leq>";
      xml += "<Geq><FieldRef Name='EffectiveEndDate' /><Value IncludeTimeValue='TRUE' Type='DateTime'>" + currentTime.utc(true).toISOString() + "</Value></Geq></And></Where>";
      xml += "</Query></View>";

      const q: CamlQuery = {
        ViewXml: xml,
      };
  
      myWeb.lists.getByTitle("Notifications").getItemsByCAMLQuery(q).then((alerts: any[]) => {

        for (let a of alerts) {
          items.push(a);
        }
  
        this.setState({ notificationItems: items, loading: false });
        
      }).catch((error: any) => {
  
        let e = error;
  
      });
    
        for (let i of this.state.notificationItems) { 

            const content = [{
            text: i.Title,
            className: styles.notificationText,
            animation: 'fade'
          }];
          contents.push(content);
        }
     
        let msgBar = <div><ReactTextRotator
        content={contents}
        time={5000}
        startDelay={2000}
        ></ReactTextRotator>
        </div>;

        //msgBars.push(msgBar);
    
        return msgBar;
      } */
//}