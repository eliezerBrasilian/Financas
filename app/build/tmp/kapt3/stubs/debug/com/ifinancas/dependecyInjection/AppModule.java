package com.ifinancas.dependecyInjection;

import android.content.Context;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.FirebaseFirestore;
import com.ifinancas.services.AuthService;
import com.ifinancas.services.DateTimeService;
import com.ifinancas.services.FinancialOperationsService;
import com.ifinancas.services.NotificationService;
import com.ifinancas.services.UserService;
import com.ifinancas.services.impl.AuthServiceImpl;
import com.ifinancas.services.impl.DateTimeServiceImpl;
import com.ifinancas.services.impl.FinancialOperationsServiceImpl;
import com.ifinancas.services.impl.NotificationServiceImpl;
import com.ifinancas.services.impl.UserServiceImpl;
import dagger.Module;
import dagger.Provides;
import dagger.hilt.InstallIn;
import dagger.hilt.android.qualifiers.ApplicationContext;
import dagger.hilt.components.SingletonComponent;
import javax.inject.Singleton;

@dagger.Module
@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000@\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0003\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\b\u00c7\u0002\u0018\u00002\u00020\u0001B\u0007\b\u0002\u00a2\u0006\u0002\u0010\u0002J\u0018\u0010\u0003\u001a\u00020\u00042\u0006\u0010\u0005\u001a\u00020\u00062\u0006\u0010\u0007\u001a\u00020\bH\u0007J\b\u0010\t\u001a\u00020\nH\u0007J\"\u0010\u000b\u001a\u00020\f2\u0006\u0010\u0007\u001a\u00020\b2\u0006\u0010\r\u001a\u00020\n2\b\b\u0001\u0010\u000e\u001a\u00020\u000fH\u0007J\b\u0010\u0010\u001a\u00020\u0006H\u0007J\b\u0010\u0011\u001a\u00020\bH\u0007J\b\u0010\u0012\u001a\u00020\u0013H\u0007J\u001a\u0010\u0014\u001a\u00020\u00152\b\b\u0001\u0010\u000e\u001a\u00020\u000f2\u0006\u0010\u0007\u001a\u00020\bH\u0007\u00a8\u0006\u0016"}, d2 = {"Lcom/ifinancas/dependecyInjection/AppModule;", "", "()V", "provideAuthRepository", "Lcom/ifinancas/services/AuthService;", "auth", "Lcom/google/firebase/auth/FirebaseAuth;", "firestore", "Lcom/google/firebase/firestore/FirebaseFirestore;", "provideDateTimeService", "Lcom/ifinancas/services/DateTimeService;", "provideFinancialOperationsService", "Lcom/ifinancas/services/FinancialOperationsService;", "dateTimeService", "context", "Landroid/content/Context;", "provideFirebaseAuth", "provideFirebaseFirestore", "provideNotificationService", "Lcom/ifinancas/services/NotificationService;", "provideUserService", "Lcom/ifinancas/services/UserService;", "app_debug"})
@dagger.hilt.InstallIn(value = {dagger.hilt.components.SingletonComponent.class})
public final class AppModule {
    @org.jetbrains.annotations.NotNull
    public static final com.ifinancas.dependecyInjection.AppModule INSTANCE = null;
    
    private AppModule() {
        super();
    }
    
    @dagger.Provides
    @javax.inject.Singleton
    @org.jetbrains.annotations.NotNull
    public final com.google.firebase.auth.FirebaseAuth provideFirebaseAuth() {
        return null;
    }
    
    @dagger.Provides
    @javax.inject.Singleton
    @org.jetbrains.annotations.NotNull
    public final com.google.firebase.firestore.FirebaseFirestore provideFirebaseFirestore() {
        return null;
    }
    
    @dagger.Provides
    @javax.inject.Singleton
    @org.jetbrains.annotations.NotNull
    public final com.ifinancas.services.AuthService provideAuthRepository(@org.jetbrains.annotations.NotNull
    com.google.firebase.auth.FirebaseAuth auth, @org.jetbrains.annotations.NotNull
    com.google.firebase.firestore.FirebaseFirestore firestore) {
        return null;
    }
    
    @dagger.Provides
    @javax.inject.Singleton
    @org.jetbrains.annotations.NotNull
    public final com.ifinancas.services.DateTimeService provideDateTimeService() {
        return null;
    }
    
    @dagger.Provides
    @javax.inject.Singleton
    @org.jetbrains.annotations.NotNull
    public final com.ifinancas.services.FinancialOperationsService provideFinancialOperationsService(@org.jetbrains.annotations.NotNull
    com.google.firebase.firestore.FirebaseFirestore firestore, @org.jetbrains.annotations.NotNull
    com.ifinancas.services.DateTimeService dateTimeService, @dagger.hilt.android.qualifiers.ApplicationContext
    @org.jetbrains.annotations.NotNull
    android.content.Context context) {
        return null;
    }
    
    @dagger.Provides
    @javax.inject.Singleton
    @org.jetbrains.annotations.NotNull
    public final com.ifinancas.services.UserService provideUserService(@dagger.hilt.android.qualifiers.ApplicationContext
    @org.jetbrains.annotations.NotNull
    android.content.Context context, @org.jetbrains.annotations.NotNull
    com.google.firebase.firestore.FirebaseFirestore firestore) {
        return null;
    }
    
    @dagger.Provides
    @javax.inject.Singleton
    @org.jetbrains.annotations.NotNull
    public final com.ifinancas.services.NotificationService provideNotificationService() {
        return null;
    }
}