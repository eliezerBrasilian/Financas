package com.ifinancas.services;

import com.ifinancas.data.dataclass.FirebaseUserResponse;
import com.ifinancas.data.dataclass.UserAuthSignUpData;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u00000\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0000\n\u0002\u0010\u0002\n\u0000\n\u0002\u0010\u000e\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\n\n\u0002\u0018\u0002\n\u0002\b\u0002\bf\u0018\u00002\u00020\u0001Jg\u0010\u0002\u001a\u00020\u00032\u0006\u0010\u0004\u001a\u00020\u00052\u0006\u0010\u0006\u001a\u00020\u00052!\u0010\u0007\u001a\u001d\u0012\u0013\u0012\u00110\t\u00a2\u0006\f\b\n\u0012\b\b\u000b\u0012\u0004\b\b(\f\u0012\u0004\u0012\u00020\u00030\b2!\u0010\r\u001a\u001d\u0012\u0013\u0012\u00110\u0005\u00a2\u0006\f\b\n\u0012\b\b\u000b\u0012\u0004\b\b(\u000e\u0012\u0004\u0012\u00020\u00030\bH\u00a6@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u000fJy\u0010\u0010\u001a\u00020\u00032\u0006\u0010\u0004\u001a\u00020\u00052\u0006\u0010\u000b\u001a\u00020\u00052\b\u0010\u0011\u001a\u0004\u0018\u00010\u00052\u0006\u0010\u0012\u001a\u00020\u00052!\u0010\u0007\u001a\u001d\u0012\u0013\u0012\u00110\t\u00a2\u0006\f\b\n\u0012\b\b\u000b\u0012\u0004\b\b(\f\u0012\u0004\u0012\u00020\u00030\b2!\u0010\r\u001a\u001d\u0012\u0013\u0012\u00110\u0005\u00a2\u0006\f\b\n\u0012\b\b\u000b\u0012\u0004\b\b(\u000e\u0012\u0004\u0012\u00020\u00030\bH\u00a6@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u0013Jo\u0010\u0014\u001a\u00020\u00032\u0006\u0010\u0004\u001a\u00020\u00052\u0006\u0010\u0006\u001a\u00020\u00052\u0006\u0010\u000b\u001a\u00020\u00052!\u0010\u0007\u001a\u001d\u0012\u0013\u0012\u00110\u0015\u00a2\u0006\f\b\n\u0012\b\b\u000b\u0012\u0004\b\b(\f\u0012\u0004\u0012\u00020\u00030\b2!\u0010\r\u001a\u001d\u0012\u0013\u0012\u00110\u0005\u00a2\u0006\f\b\n\u0012\b\b\u000b\u0012\u0004\b\b(\u000e\u0012\u0004\u0012\u00020\u00030\bH\u00a6@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u0016\u0082\u0002\u0004\n\u0002\b\u0019\u00a8\u0006\u0017"}, d2 = {"Lcom/ifinancas/services/AuthService;", "", "login", "", "email", "", "password", "onSuccess", "Lkotlin/Function1;", "Lcom/ifinancas/data/dataclass/FirebaseUserResponse;", "Lkotlin/ParameterName;", "name", "user", "onError", "errorCode", "(Ljava/lang/String;Ljava/lang/String;Lkotlin/jvm/functions/Function1;Lkotlin/jvm/functions/Function1;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "loginWithGoogle", "photo", "userUid", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Lkotlin/jvm/functions/Function1;Lkotlin/jvm/functions/Function1;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "signUp", "Lcom/ifinancas/data/dataclass/UserAuthSignUpData;", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Lkotlin/jvm/functions/Function1;Lkotlin/jvm/functions/Function1;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "app_release"})
public abstract interface AuthService {
    
    @org.jetbrains.annotations.Nullable
    public abstract java.lang.Object login(@org.jetbrains.annotations.NotNull
    java.lang.String email, @org.jetbrains.annotations.NotNull
    java.lang.String password, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super com.ifinancas.data.dataclass.FirebaseUserResponse, kotlin.Unit> onSuccess, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super java.lang.String, kotlin.Unit> onError, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlin.Unit> $completion);
    
    @org.jetbrains.annotations.Nullable
    public abstract java.lang.Object signUp(@org.jetbrains.annotations.NotNull
    java.lang.String email, @org.jetbrains.annotations.NotNull
    java.lang.String password, @org.jetbrains.annotations.NotNull
    java.lang.String name, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super com.ifinancas.data.dataclass.UserAuthSignUpData, kotlin.Unit> onSuccess, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super java.lang.String, kotlin.Unit> onError, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlin.Unit> $completion);
    
    @org.jetbrains.annotations.Nullable
    public abstract java.lang.Object loginWithGoogle(@org.jetbrains.annotations.NotNull
    java.lang.String email, @org.jetbrains.annotations.NotNull
    java.lang.String name, @org.jetbrains.annotations.Nullable
    java.lang.String photo, @org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super com.ifinancas.data.dataclass.FirebaseUserResponse, kotlin.Unit> onSuccess, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super java.lang.String, kotlin.Unit> onError, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlin.Unit> $completion);
}