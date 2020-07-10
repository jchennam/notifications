import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'IntranetNotificationApplicationCustomizerStrings';
import pnp from 'sp-pnp-js/lib/pnp';
import styles from './components/IntranetComponent.module.scss';
import IntranetComponent, {IIntranetComponentProps} from './components/IntranetComponent.js';

const LOG_SOURCE: string = 'IntranetNotificationApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IIntranetNotificationApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class IntranetNotificationApplicationCustomizer
  extends BaseApplicationCustomizer<IIntranetNotificationApplicationCustomizerProperties> {

    private _topPlaceholder: PlaceholderContent;

  @override
  public onInit(): Promise<void> {
  
    // Prime the pnp framework
    pnp.setup({
      spfxContext: this.context
    }); 

    // Wait for the placeholders to be created (or handle them being changed) and then
  // render.
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {

     // Handling the top placeholder
  if (!this._topPlaceholder) {
    this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Top,
      { onDispose: this._onDispose }
    );

    var inlineStyles = {backgroundColor:'red', fontSize:20};

    const element: React.ReactElement<IIntranetComponentProps> = React.createElement(
      IntranetComponent,
      {}
    ); 
    //Dialog.alert(`Hello all from ${strings.Title}:\n\n`);

    
    ReactDOM.render(element, this._topPlaceholder.domElement);
    console.log(element);
    if (this._topPlaceholder.domElement) {
     /*   this._topPlaceholder.domElement.innerHTML = `
      <div class="${styles.app}">
        <div class="${styles.top}">
          <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> testing....
        </div>
      </div>`;   */
      
    }
    }
  }

  private _onDispose(): void {
    console.log('Disposed custom top placeholder.');
  }
}
  
