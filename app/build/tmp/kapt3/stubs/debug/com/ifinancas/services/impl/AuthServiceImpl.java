package com.ifinancas.services.impl;

import android.os.Build;
import android.util.Log;
import androidx.annotation.RequiresApi;
import com.foodfacil.enums.Collections;
import com.google.firebase.FirebaseTooManyRequestsException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.auth.FirebaseAuthInvalidUserException;
import com.google.firebase.auth.FirebaseAuthUserCollisionException;
import com.google.firebase.firestore.FieldValue;
import com.google.firebase.firestore.FirebaseFirestore;
import com.ifinancas.data.dataclass.FirebaseUserResponse;
import com.ifinancas.data.dataclass.UserAuthSignUpData;
import com.ifinancas.services.AuthService;
import kotlinx.coroutines.Dispatchers;
import java.time.Instant;
import javax.inject.Inject;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000L\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\u0002\n\u0000\n\u0002\u0010\u000e\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010%\n\u0002\u0010\u0000\n\u0002\b\u0005\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\u000b\n\u0002\u0018\u0002\n\u0002\b\u0004\u0018\u00002\u00020\u0001B\u0017\b\u0007\u0012\u0006\u0010\u0002\u001a\u00020\u0003\u0012\u0006\u0010\u0004\u001a\u00020\u0005\u00a2\u0006\u0002\u0010\u0006J\u0019\u0010\u0007\u001a\u00020\b2\u0006\u0010\t\u001a\u00020\nH\u0082@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u000bJ\u001a\u0010\f\u001a\u00020\r2\u0012\u0010\u000e\u001a\u000e\u0012\u0004\u0012\u00020\n\u0012\u0004\u0012\u00020\u00100\u000fJ\u001a\u0010\u0011\u001a\u00020\r2\u0012\u0010\u000e\u001a\u000e\u0012\u0004\u0012\u00020\n\u0012\u0004\u0012\u00020\u00100\u000fJg\u0010\u0012\u001a\u00020\b2\u0006\u0010\u0013\u001a\u00020\n2\u0006\u0010\u0014\u001a\u00020\n2!\u0010\u0015\u001a\u001d\u0012\u0013\u0012\u00110\r\u00a2\u0006\f\b\u0017\u0012\b\b\u0018\u0012\u0004\b\b(\u0019\u0012\u0004\u0012\u00020\b0\u00162!\u0010\u001a\u001a\u001d\u0012\u0013\u0012\u00110\n\u00a2\u0006\f\b\u0017\u0012\b\b\u0018\u0012\u0004\b\b(\u001b\u0012\u0004\u0012\u00020\b0\u0016H\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u001cJy\u0010\u001d\u001a\u00020\b2\u0006\u0010\u0013\u001a\u00020\n2\u0006\u0010\u0018\u001a\u00020\n2\b\u0010\u001e\u001a\u0004\u0018\u00010\n2\u0006\u0010\t\u001a\u00020\n2!\u0010\u0015\u001a\u001d\u0012\u0013\u0012\u00110\r\u00a2\u0006\f\b\u0017\u0012\b\b\u0018\u0012\u0004\b\b(\u0019\u0012\u0004\u0012\u00020\b0\u00162!\u0010\u001a\u001a\u001d\u0012\u0013\u0012\u00110\n\u00a2\u0006\f\b\u0017\u0012\b\b\u0018\u0012\u0004\b\b(\u001b\u0012\u0004\u0012\u00020\b0\u0016H\u0097@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u001fJ\'\u0010 \u001a\u0010\u0012\u0004\u0012\u00020\n\u0012\u0004\u0012\u00020\u0010\u0018\u00010\u000f2\u0006\u0010\t\u001a\u00020\nH\u0082@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u000bJ\u0019\u0010!\u001a\u00020\b2\u0006\u0010\"\u001a\u00020#H\u0082@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010$Jo\u0010%\u001a\u00020\b2\u0006\u0010\u0013\u001a\u00020\n2\u0006\u0010\u0014\u001a\u00020\n2\u0006\u0010\u0018\u001a\u00020\n2!\u0010\u0015\u001a\u001d\u0012\u0013\u0012\u00110#\u00a2\u0006\f\b\u0017\u0012\b\b\u0018\u0012\u0004\b\b(\u0019\u0012\u0004\u0012\u00020\b0\u00162!\u0010\u001a\u001a\u001d\u0012\u0013\u0012\u00110\n\u00a2\u0006\f\b\u0017\u0012\b\b\u0018\u0012\u0004\b\b(\u001b\u0012\u0004\u0012\u00020\b0\u0016H\u0097@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010&R\u000e\u0010\u0002\u001a\u00020\u0003X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0004\u001a\u00020\u0005X\u0082\u0004\u00a2\u0006\u0002\n\u0000\u0082\u0002\u0004\n\u0002\b\u0019\u00a8\u0006\'"}, d2 = {"Lcom/ifinancas/services/impl/AuthServiceImpl;", "Lcom/ifinancas/services/AuthService;", "auth", "Lcom/google/firebase/auth/FirebaseAuth;", "firestore", "Lcom/google/firebase/firestore/FirebaseFirestore;", "(Lcom/google/firebase/auth/FirebaseAuth;Lcom/google/firebase/firestore/FirebaseFirestore;)V", "createCollectionBalancesRelatedToTheUser", "", "userUid", "", "(Ljava/lang/String;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "firestoreUserMaptoFirebaseUserResponse", "Lcom/ifinancas/data/dataclass/FirebaseUserResponse;", "userDataFromFirestore", "", "", "firestoreUserMaptoFirebaseUserResponseWhithoutPrefixIs", "login", "email", "password", "onSuccess", "Lkotlin/Function1;", "Lkotlin/ParameterName;", "name", "user", "onError", "errorCode", "(Ljava/lang/String;Ljava/lang/String;Lkotlin/jvm/functions/Function1;Lkotlin/jvm/functions/Function1;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "loginWithGoogle", "photo", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Lkotlin/jvm/functions/Function1;Lkotlin/jvm/functions/Function1;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "retrieveUserDataFromFirestore", "saveUserOnFirestore", "userData", "Lcom/ifinancas/data/dataclass/UserAuthSignUpData;", "(Lcom/ifinancas/data/dataclass/UserAuthSignUpData;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "signUp", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Lkotlin/jvm/functions/Function1;Lkotlin/jvm/functions/Function1;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "app_debug"})
public final class AuthServiceImpl implements com.ifinancas.services.AuthService {
    @org.jetbrains.annotations.NotNull
    private final com.google.firebase.auth.FirebaseAuth auth = null;
    @org.jetbrains.annotations.NotNull
    private final com.google.firebase.firestore.FirebaseFirestore firestore = null;
    
    @javax.inject.Inject
    public AuthServiceImpl(@org.jetbrains.annotations.NotNull
    com.google.firebase.auth.FirebaseAuth auth, @org.jetbrains.annotations.NotNull
    com.google.firebase.firestore.FirebaseFirestore firestore) {
        super();
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object login(@org.jetbrains.annotations.NotNull
    java.lang.String email, @org.jetbrains.annotations.NotNull
    java.lang.String password, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super com.ifinancas.data.dataclass.FirebaseUserResponse, kotlin.Unit> onSuccess, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super java.lang.String, kotlin.Unit> onError, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlin.Unit> $completion) {
        return null;
    }
    
    @java.lang.Override
    @androidx.annotation.RequiresApi(value = android.os.Build.VERSION_CODES.O)
    @org.jetbrains.annotations.Nullable
    public java.lang.Object signUp(@org.jetbrains.annotations.NotNull
    java.lang.String email, @org.jetbrains.annotations.NotNull
    java.lang.String password, @org.jetbrains.annotations.NotNull
    java.lang.String name, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super com.ifinancas.data.dataclass.UserAuthSignUpData, kotlin.Unit> onSuccess, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super java.lang.String, kotlin.Unit> onError, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlin.Unit> $completion) {
        return null;
    }
    
    @java.lang.Override
    @androidx.annotation.RequiresApi(value = android.os.Build.VERSION_CODES.O)
    @org.jetbrains.annotations.Nullable
    public java.lang.Object loginWithGoogle(@org.jetbrains.annotations.NotNull
    java.lang.String email, @org.jetbrains.annotations.NotNull
    java.lang.String name, @org.jetbrains.annotations.Nullable
    java.lang.String photo, @org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super com.ifinancas.data.dataclass.FirebaseUserResponse, kotlin.Unit> onSuccess, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super java.lang.String, kotlin.Unit> onError, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlin.Unit> $completion) {
        return null;
    }
    
    private final java.lang.Object saveUserOnFirestore(com.ifinancas.data.dataclass.UserAuthSignUpData userData, kotlin.coroutines.Continuation<? super kotlin.Unit> $completion) {
        return null;
    }
    
    private final java.lang.Object createCollectionBalancesRelatedToTheUser(java.lang.String userUid, kotlin.coroutines.Continuation<? super kotlin.Unit> $completion) {
        return null;
    }
    
    private final java.lang.Object retrieveUserDataFromFirestore(java.lang.String userUid, kotlin.coroutines.Continuation<? super java.util.Map<java.lang.String, java.lang.Object>> $completion) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final com.ifinancas.data.dataclass.FirebaseUserResponse firestoreUserMaptoFirebaseUserResponse(@org.jetbrains.annotations.NotNull
    java.util.Map<java.lang.String, java.lang.Object> userDataFromFirestore) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final com.ifinancas.data.dataclass.FirebaseUserResponse firestoreUserMaptoFirebaseUserResponseWhithoutPrefixIs(@org.jetbrains.annotations.NotNull
    java.util.Map<java.lang.String, java.lang.Object> userDataFromFirestore) {
        return null;
    }
}