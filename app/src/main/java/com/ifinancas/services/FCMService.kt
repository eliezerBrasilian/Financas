package com.ifinancas.services

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.ifinancas.MainActivity
import com.ifinancas.R

class FCMService : FirebaseMessagingService() {

    override fun onNewToken(token: String) {
        super.onNewToken(token)
    }

    override fun onMessageReceived(message: RemoteMessage) {
        val print = Print("FCMSERVUCE")
        print.log(message.data)
        super.onMessageReceived(message)

        val notificationManager =
            getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        val notificationId = 1
        val requestCode = 1

        val channelId = "Firebase Messaging ID"
        val channelName = "Firebase Messaging"
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            notificationManager.createNotificationChannel(
                NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_HIGH)
            )
        }

        val intent = Intent(this, MainActivity::class.java)
        val pendingIntentFlag =
            if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.M) 0 else PendingIntent.FLAG_IMMUTABLE
        val pendingIntent = PendingIntent.getActivity(this, requestCode, intent, pendingIntentFlag)

        val notification = NotificationCompat.Builder(this, channelId)
            .setContentTitle(message.notification?.title)
            .setContentText(message.notification?.body)
            .setSmallIcon(R.drawable.crown_list)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .build()

        notificationManager.notify(notificationId, notification)
    }
}