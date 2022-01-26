import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import { FlexNotification } from './enums';
import { Actions, Notifications, NotificationType, NotificationBar, Tab, TaskHelper } from "@twilio/flex-ui";

const PLUGIN_NAME = 'AgentSkillNotificationPlugin';

export default class AgentSkillNotificationPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {

    const getState = () =>  manager.store.getState();
    //get the most recent/updated state

    manager.strings[FlexNotification.currentSkills] = (
      'You current skills are : "{{skills}}" '
   );

    //Registering  notification
    Notifications.registerNotification({
      id: FlexNotification.currentSkills,       // Assign an id for the first notification
      content: FlexNotification.currentSkills,  // Passing the component as content
      type: NotificationType.info,              // Specifying the type of notification
      timeout: 10000,                           // Set the timeout for this notification
      backgroundColor: "lemonchiffon",          // Set the color for this notification
      actions: [                                // You can dismiss this notification by clicking on the Dismiss label
        <NotificationBar.Action
            onClick={(_, notification) => {
              Notifications.dismissNotificationById(FlexNotification.currentSkills);
            }}
            label="Dismiss"
        />
      ]
    });

    Actions.addListener("afterSetActivity", payload=>{
      if (payload.activityName == "Available"){
          Notifications.showNotification(FlexNotification.currentSkills, { skills: getState().flex.worker.attributes.routing.skills});
     }
   });

  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */

}
