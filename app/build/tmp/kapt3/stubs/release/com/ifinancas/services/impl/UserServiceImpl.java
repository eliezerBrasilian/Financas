package com.ifinancas.services.impl;

import android.content.Context;
import android.util.Log;
import androidx.datastore.core.DataStore;
import androidx.datastore.preferences.core.Preferences;
import com.google.firebase.firestore.FirebaseFirestore;
import com.ifinancas.utils.UploadFile;
import com.ifinancas.services.UserService;
import com.ifinancas.utils.Toast;
import dagger.hilt.android.qualifiers.ApplicationContext;
import kotlinx.coroutines.flow.Flow;
import javax.inject.Inject;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000,\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\u0010\u000e\n\u0002\b\u0013\u0018\u0000 \u001e2\u00020\u0001:\u0001\u001eB\u0019\b\u0007\u0012\b\b\u0001\u0010\u0002\u001a\u00020\u0003\u0012\u0006\u0010\u0004\u001a\u00020\u0005\u00a2\u0006\u0002\u0010\u0006J\u0011\u0010\u0007\u001a\u00020\bH\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\tJ\u0019\u0010\n\u001a\n\u0012\u0006\u0012\u0004\u0018\u00010\f0\u000bH\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\tJ\u0019\u0010\r\u001a\n\u0012\u0006\u0012\u0004\u0018\u00010\f0\u000bH\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\tJ\u0019\u0010\u000e\u001a\n\u0012\u0006\u0012\u0004\u0018\u00010\f0\u000bH\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\tJ\u0019\u0010\u000f\u001a\n\u0012\u0006\u0012\u0004\u0018\u00010\f0\u000bH\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\tJ\u0019\u0010\u0010\u001a\u00020\b2\u0006\u0010\u0011\u001a\u00020\fH\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u0012J\u0019\u0010\u0013\u001a\u00020\b2\u0006\u0010\u0014\u001a\u00020\fH\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u0012J\u0019\u0010\u0015\u001a\u00020\b2\u0006\u0010\u0016\u001a\u00020\fH\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u0012J\u0019\u0010\u0017\u001a\u00020\b2\u0006\u0010\u0018\u001a\u00020\fH\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u0012J+\u0010\u0019\u001a\u00020\b2\b\u0010\u001a\u001a\u0004\u0018\u00010\f2\u0006\u0010\u001b\u001a\u00020\f2\u0006\u0010\u001c\u001a\u00020\fH\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u001dR\u000e\u0010\u0002\u001a\u00020\u0003X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0004\u001a\u00020\u0005X\u0082\u0004\u00a2\u0006\u0002\n\u0000\u0082\u0002\u0004\n\u0002\b\u0019\u00a8\u0006\u001f"}, d2 = {"Lcom/ifinancas/services/impl/UserServiceImpl;", "Lcom/ifinancas/services/UserService;", "context", "Landroid/content/Context;", "firestore", "Lcom/google/firebase/firestore/FirebaseFirestore;", "(Landroid/content/Context;Lcom/google/firebase/firestore/FirebaseFirestore;)V", "clearAllData", "", "(Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "getEmail", "Lkotlinx/coroutines/flow/Flow;", "", "getName", "getPhoto", "getUid", "saveEmail", "email", "(Ljava/lang/String;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "saveName", "name", "savePhoto", "photo", "saveUid", "uid", "updateProfilePicture", "oldProfilePictureReferenceUrl", "newProfilePicture", "userUid", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "Companion", "app_release"})
public final class UserServiceImpl implements com.ifinancas.services.UserService {
    @org.jetbrains.annotations.NotNull
    private final android.content.Context context = null;
    @org.jetbrains.annotations.NotNull
    private final com.google.firebase.firestore.FirebaseFirestore firestore = null;
    @org.jetbrains.annotations.NotNull
    private static final kotlin.properties.ReadOnlyProperty<?, ?> dataStore$delegate = null;
    @org.jetbrains.annotations.NotNull
    private static final androidx.datastore.preferences.core.Preferences.Key<java.lang.String> USER_EMAIL_KEY = null;
    @org.jetbrains.annotations.NotNull
    private static final androidx.datastore.preferences.core.Preferences.Key<java.lang.String> USER_NAME_KEY = null;
    @org.jetbrains.annotations.NotNull
    private static final androidx.datastore.preferences.core.Preferences.Key<java.lang.String> USER_UID = null;
    @org.jetbrains.annotations.NotNull
    private static final androidx.datastore.preferences.core.Preferences.Key<java.lang.String> USER_TOKEN = null;
    @org.jetbrains.annotations.NotNull
    private static final androidx.datastore.preferences.core.Preferences.Key<java.lang.String> USER_PHOTO = null;
    @org.jetbrains.annotations.NotNull
    public static final com.ifinancas.services.impl.UserServiceImpl.Companion Companion = null;
    
    @javax.inject.Inject
    public UserServiceImpl(@dagger.hilt.android.qualifiers.ApplicationContext
    @org.jetbrains.annotations.NotNull
    android.content.Context context, @org.jetbrains.annotations.NotNull
    com.google.firebase.firestore.FirebaseFirestore firestore) {
        super();
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object getEmail(@org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlinx.coroutines.flow.Flow<java.lang.String>> $completion) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object getName(@org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlinx.coroutines.flow.Flow<java.lang.String>> $completion) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object getUid(@org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlinx.coroutines.flow.Flow<java.lang.String>> $completion) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object getPhoto(@org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlinx.coroutines.flow.Flow<java.lang.String>> $completion) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object saveEmail(@org.jetbrains.annotations.NotNull
    java.lang.String email, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlin.Unit> $completion) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object saveName(@org.jetbrains.annotations.NotNull
    java.lang.String name, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlin.Unit> $completion) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object saveUid(@org.jetbrains.annotations.NotNull
    java.lang.String uid, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlin.Unit> $completion) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object savePhoto(@org.jetbrains.annotations.NotNull
    java.lang.String photo, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlin.Unit> $completion) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object clearAllData(@org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlin.Unit> $completion) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object updateProfilePicture(@org.jetbrains.annotations.Nullable
    java.lang.String oldProfilePictureReferenceUrl, @org.jetbrains.annotations.NotNull
    java.lang.String newProfilePicture, @org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlin.Unit> $completion) {
        return null;
    }
    
    @kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000(\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\u0010\u000e\n\u0002\b\u000b\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\u0005\b\u0086\u0003\u0018\u00002\u00020\u0001B\u0007\b\u0002\u00a2\u0006\u0002\u0010\u0002R\u0017\u0010\u0003\u001a\b\u0012\u0004\u0012\u00020\u00050\u0004\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0006\u0010\u0007R\u0017\u0010\b\u001a\b\u0012\u0004\u0012\u00020\u00050\u0004\u00a2\u0006\b\n\u0000\u001a\u0004\b\t\u0010\u0007R\u0017\u0010\n\u001a\b\u0012\u0004\u0012\u00020\u00050\u0004\u00a2\u0006\b\n\u0000\u001a\u0004\b\u000b\u0010\u0007R\u0017\u0010\f\u001a\b\u0012\u0004\u0012\u00020\u00050\u0004\u00a2\u0006\b\n\u0000\u001a\u0004\b\r\u0010\u0007R\u0017\u0010\u000e\u001a\b\u0012\u0004\u0012\u00020\u00050\u0004\u00a2\u0006\b\n\u0000\u001a\u0004\b\u000f\u0010\u0007R%\u0010\u0010\u001a\b\u0012\u0004\u0012\u00020\u00120\u0011*\u00020\u00138BX\u0082\u0084\u0002\u00a2\u0006\f\n\u0004\b\u0016\u0010\u0017\u001a\u0004\b\u0014\u0010\u0015\u00a8\u0006\u0018"}, d2 = {"Lcom/ifinancas/services/impl/UserServiceImpl$Companion;", "", "()V", "USER_EMAIL_KEY", "Landroidx/datastore/preferences/core/Preferences$Key;", "", "getUSER_EMAIL_KEY", "()Landroidx/datastore/preferences/core/Preferences$Key;", "USER_NAME_KEY", "getUSER_NAME_KEY", "USER_PHOTO", "getUSER_PHOTO", "USER_TOKEN", "getUSER_TOKEN", "USER_UID", "getUSER_UID", "dataStore", "Landroidx/datastore/core/DataStore;", "Landroidx/datastore/preferences/core/Preferences;", "Landroid/content/Context;", "getDataStore", "(Landroid/content/Context;)Landroidx/datastore/core/DataStore;", "dataStore$delegate", "Lkotlin/properties/ReadOnlyProperty;", "app_release"})
    public static final class Companion {
        
        private Companion() {
            super();
        }
        
        private final androidx.datastore.core.DataStore<androidx.datastore.preferences.core.Preferences> getDataStore(android.content.Context $this$dataStore) {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull
        public final androidx.datastore.preferences.core.Preferences.Key<java.lang.String> getUSER_EMAIL_KEY() {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull
        public final androidx.datastore.preferences.core.Preferences.Key<java.lang.String> getUSER_NAME_KEY() {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull
        public final androidx.datastore.preferences.core.Preferences.Key<java.lang.String> getUSER_UID() {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull
        public final androidx.datastore.preferences.core.Preferences.Key<java.lang.String> getUSER_TOKEN() {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull
        public final androidx.datastore.preferences.core.Preferences.Key<java.lang.String> getUSER_PHOTO() {
            return null;
        }
    }
}