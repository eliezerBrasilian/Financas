package com.ifinancas.utils;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import androidx.core.app.NotificationCompat;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.ifinancas.MainActivity;
import com.ifinancas.R;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000\u0018\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\u0018\u00002\u00020\u0001B\u0005\u00a2\u0006\u0002\u0010\u0002J\u0010\u0010\u0003\u001a\u00020\u00042\u0006\u0010\u0005\u001a\u00020\u0006H\u0016\u00a8\u0006\u0007"}, d2 = {"Lcom/ifinancas/utils/FCMService;", "Lcom/google/firebase/messaging/FirebaseMessagingService;", "()V", "onMessageReceived", "", "message", "Lcom/google/firebase/messaging/RemoteMessage;", "app_debug"})
public final class FCMService extends com.google.firebase.messaging.FirebaseMessagingService {
    
    public FCMService() {
        super();
    }
    
    @java.lang.Override
    public void onMessageReceived(@org.jetbrains.annotations.NotNull
    com.google.firebase.messaging.RemoteMessage message) {
    }
}