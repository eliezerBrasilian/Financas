package com.ifinancas.services.impl;

import android.content.Context;
import android.util.Log;
import com.foodfacil.enums.Collections;
import com.google.firebase.Timestamp;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import com.ifinancas.data.dataclass.Register;
import com.ifinancas.data.enums.Tags;
import com.ifinancas.services.DateTimeService;
import com.ifinancas.services.FinancialOperationsService;
import com.ifinancas.utils.Toast;
import dagger.hilt.android.qualifiers.ApplicationContext;
import javax.inject.Inject;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000\\\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0006\n\u0002\u0010\u0002\n\u0000\n\u0002\u0010\u000e\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0003\n\u0002\u0010\u0006\n\u0002\b\u0006\n\u0002\u0010 \n\u0002\u0018\u0002\n\u0002\b\u0004\n\u0002\u0010\u000b\n\u0000\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0002\u0018\u0002\n\u0002\b\u0004\u0018\u00002\u00020\u0001B!\b\u0007\u0012\u0006\u0010\u0002\u001a\u00020\u0003\u0012\u0006\u0010\u0004\u001a\u00020\u0005\u0012\b\b\u0001\u0010\u0006\u001a\u00020\u0007\u00a2\u0006\u0002\u0010\bJ5\u0010\r\u001a\u00020\u000e2\u0006\u0010\u000f\u001a\u00020\u00102\f\u0010\u0011\u001a\b\u0012\u0004\u0012\u00020\u000e0\u00122\f\u0010\u0013\u001a\b\u0012\u0004\u0012\u00020\u000e0\u0012H\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u0014J!\u0010\u0015\u001a\u00020\u00162\u0006\u0010\u0017\u001a\u00020\u00102\u0006\u0010\u0018\u001a\u00020\u0010H\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u0019J!\u0010\u001a\u001a\u00020\u00162\u0006\u0010\u0017\u001a\u00020\u00102\u0006\u0010\u0018\u001a\u00020\u0010H\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u0019J!\u0010\u001b\u001a\u00020\u00162\u0006\u0010\u0017\u001a\u00020\u00102\u0006\u0010\u0018\u001a\u00020\u0010H\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u0019J\'\u0010\u001c\u001a\b\u0012\u0004\u0012\u00020\u001e0\u001d2\u0006\u0010\u001f\u001a\u00020\u00102\u0006\u0010\u0017\u001a\u00020\u0010H\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u0019J/\u0010\u001c\u001a\b\u0012\u0004\u0012\u00020\u001e0\u001d2\u0006\u0010\u001f\u001a\u00020\u00102\u0006\u0010\u0017\u001a\u00020\u00102\u0006\u0010 \u001a\u00020\u0010H\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010!JQ\u0010\"\u001a\u00020#2\"\u0010$\u001a\u001e\u0012\u0004\u0012\u00020\u0010\u0012\u0004\u0012\u00020&0%j\u000e\u0012\u0004\u0012\u00020\u0010\u0012\u0004\u0012\u00020&`\'2\f\u0010(\u001a\b\u0012\u0004\u0012\u00020\u000e0\u00122\f\u0010)\u001a\b\u0012\u0004\u0012\u00020\u000e0\u0012H\u0096@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010*R\u000e\u0010\u0006\u001a\u00020\u0007X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u0011\u0010\u0004\u001a\u00020\u0005\u00a2\u0006\b\n\u0000\u001a\u0004\b\t\u0010\nR\u0011\u0010\u0002\u001a\u00020\u0003\u00a2\u0006\b\n\u0000\u001a\u0004\b\u000b\u0010\f\u0082\u0002\u0004\n\u0002\b\u0019\u00a8\u0006+"}, d2 = {"Lcom/ifinancas/services/impl/FinancialOperationsServiceImpl;", "Lcom/ifinancas/services/FinancialOperationsService;", "firestore", "Lcom/google/firebase/firestore/FirebaseFirestore;", "dateTimeService", "Lcom/ifinancas/services/DateTimeService;", "context", "Landroid/content/Context;", "(Lcom/google/firebase/firestore/FirebaseFirestore;Lcom/ifinancas/services/DateTimeService;Landroid/content/Context;)V", "getDateTimeService", "()Lcom/ifinancas/services/DateTimeService;", "getFirestore", "()Lcom/google/firebase/firestore/FirebaseFirestore;", "deleteRegister", "", "id", "", "onSuccessDelete", "Lkotlin/Function0;", "onFailureDelete", "(Ljava/lang/String;Lkotlin/jvm/functions/Function0;Lkotlin/jvm/functions/Function0;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "getExpenses", "", "userUid", "monthName", "(Ljava/lang/String;Ljava/lang/String;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "getReservations", "getRevenues", "loadRegistersFromDateDescendly", "", "Lcom/ifinancas/data/dataclass/Register;", "dayMonthAndYear", "tag", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "saveRegister", "", "registerData", "Ljava/util/HashMap;", "", "Lkotlin/collections/HashMap;", "onSuccess", "onFailure", "(Ljava/util/HashMap;Lkotlin/jvm/functions/Function0;Lkotlin/jvm/functions/Function0;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "app_release"})
public final class FinancialOperationsServiceImpl implements com.ifinancas.services.FinancialOperationsService {
    @org.jetbrains.annotations.NotNull
    private final com.google.firebase.firestore.FirebaseFirestore firestore = null;
    @org.jetbrains.annotations.NotNull
    private final com.ifinancas.services.DateTimeService dateTimeService = null;
    @org.jetbrains.annotations.NotNull
    private final android.content.Context context = null;
    
    @javax.inject.Inject
    public FinancialOperationsServiceImpl(@org.jetbrains.annotations.NotNull
    com.google.firebase.firestore.FirebaseFirestore firestore, @org.jetbrains.annotations.NotNull
    com.ifinancas.services.DateTimeService dateTimeService, @dagger.hilt.android.qualifiers.ApplicationContext
    @org.jetbrains.annotations.NotNull
    android.content.Context context) {
        super();
    }
    
    @org.jetbrains.annotations.NotNull
    public final com.google.firebase.firestore.FirebaseFirestore getFirestore() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final com.ifinancas.services.DateTimeService getDateTimeService() {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object getRevenues(@org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    java.lang.String monthName, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super java.lang.Double> $completion) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object getReservations(@org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    java.lang.String monthName, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super java.lang.Double> $completion) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object getExpenses(@org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    java.lang.String monthName, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super java.lang.Double> $completion) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object loadRegistersFromDateDescendly(@org.jetbrains.annotations.NotNull
    java.lang.String dayMonthAndYear, @org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super java.util.List<com.ifinancas.data.dataclass.Register>> $completion) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object loadRegistersFromDateDescendly(@org.jetbrains.annotations.NotNull
    java.lang.String dayMonthAndYear, @org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    java.lang.String tag, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super java.util.List<com.ifinancas.data.dataclass.Register>> $completion) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object saveRegister(@org.jetbrains.annotations.NotNull
    java.util.HashMap<java.lang.String, java.lang.Object> registerData, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function0<kotlin.Unit> onSuccess, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function0<kotlin.Unit> onFailure, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super java.lang.Boolean> $completion) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.Nullable
    public java.lang.Object deleteRegister(@org.jetbrains.annotations.NotNull
    java.lang.String id, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function0<kotlin.Unit> onSuccessDelete, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function0<kotlin.Unit> onFailureDelete, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlin.Unit> $completion) {
        return null;
    }
}