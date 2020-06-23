import React from 'react';
import './Notification.css';


const DEFAULT_NOTIFICATION_TYPE = "inactive";
const ACCEPTED_NOTIFICATION_TYPES = new Set([
		"inactive",
		"error",
		"success"
	]);


const Notification = ({type,message}) => {


	const notificationClassName = `notif-${ACCEPTED_NOTIFICATION_TYPES.has(type) ? type : DEFAULT_NOTIFICATION_TYPE}`;

	return (<div className={notificationClassName}>
			{message}
		</div>)
}

export default Notification;