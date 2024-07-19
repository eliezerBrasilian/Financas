package com.ifinancas.services;

import com.ifinancas.data.dataclass.Register;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000D\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0000\n\u0002\u0010\u0002\n\u0000\n\u0002\u0010\u000e\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0003\n\u0002\u0010\u0006\n\u0002\b\u0006\n\u0002\u0010 \n\u0002\u0018\u0002\n\u0002\b\u0004\n\u0002\u0010\u000b\n\u0000\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\u0004\bf\u0018\u00002\u00020\u0001J7\u0010\u0002\u001a\u00020\u00032\u0006\u0010\u0004\u001a\u00020\u00052\f\u0010\u0006\u001a\b\u0012\u0004\u0012\u00020\u00030\u00072\u000e\b\u0002\u0010\b\u001a\b\u0012\u0004\u0012\u00020\u00030\u0007H\u00a6@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\tJ!\u0010\n\u001a\u00020\u000b2\u0006\u0010\f\u001a\u00020\u00052\u0006\u0010\r\u001a\u00020\u0005H\u00a6@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u000eJ!\u0010\u000f\u001a\u00020\u000b2\u0006\u0010\f\u001a\u00020\u00052\u0006\u0010\r\u001a\u00020\u0005H\u00a6@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u000eJ!\u0010\u0010\u001a\u00020\u000b2\u0006\u0010\f\u001a\u00020\u00052\u0006\u0010\r\u001a\u00020\u0005H\u00a6@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u000eJ\'\u0010\u0011\u001a\b\u0012\u0004\u0012\u00020\u00130\u00122\u0006\u0010\u0014\u001a\u00020\u00052\u0006\u0010\f\u001a\u00020\u0005H\u00a6@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u000eJ/\u0010\u0011\u001a\b\u0012\u0004\u0012\u00020\u00130\u00122\u0006\u0010\u0014\u001a\u00020\u00052\u0006\u0010\f\u001a\u00020\u00052\u0006\u0010\u0015\u001a\u00020\u0005H\u00a6@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u0016JS\u0010\u0017\u001a\u00020\u00182\"\u0010\u0019\u001a\u001e\u0012\u0004\u0012\u00020\u0005\u0012\u0004\u0012\u00020\u00010\u001aj\u000e\u0012\u0004\u0012\u00020\u0005\u0012\u0004\u0012\u00020\u0001`\u001b2\f\u0010\u001c\u001a\b\u0012\u0004\u0012\u00020\u00030\u00072\u000e\b\u0002\u0010\u001d\u001a\b\u0012\u0004\u0012\u00020\u00030\u0007H\u00a6@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\u001e\u0082\u0002\u0004\n\u0002\b\u0019\u00a8\u0006\u001f"}, d2 = {"Lcom/ifinancas/services/FinancialOperationsService;", "", "deleteRegister", "", "id", "", "onSuccessDelete", "Lkotlin/Function0;", "onFailureDelete", "(Ljava/lang/String;Lkotlin/jvm/functions/Function0;Lkotlin/jvm/functions/Function0;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "getExpenses", "", "userUid", "monthName", "(Ljava/lang/String;Ljava/lang/String;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "getReservations", "getRevenues", "loadRegistersFromDateDescendly", "", "Lcom/ifinancas/data/dataclass/Register;", "dayMonthAndYear", "tag", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "saveRegister", "", "registerData", "Ljava/util/HashMap;", "Lkotlin/collections/HashMap;", "onSuccess", "onFailure", "(Ljava/util/HashMap;Lkotlin/jvm/functions/Function0;Lkotlin/jvm/functions/Function0;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "app_release"})
public abstract interface FinancialOperationsService {
    
    @org.jetbrains.annotations.Nullable
    public abstract java.lang.Object getRevenues(@org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    java.lang.String monthName, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super java.lang.Double> $completion);
    
    @org.jetbrains.annotations.Nullable
    public abstract java.lang.Object getReservations(@org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    java.lang.String monthName, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super java.lang.Double> $completion);
    
    @org.jetbrains.annotations.Nullable
    public abstract java.lang.Object getExpenses(@org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    java.lang.String monthName, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super java.lang.Double> $completion);
    
    @org.jetbrains.annotations.Nullable
    public abstract java.lang.Object loadRegistersFromDateDescendly(@org.jetbrains.annotations.NotNull
    java.lang.String dayMonthAndYear, @org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super java.util.List<com.ifinancas.data.dataclass.Register>> $completion);
    
    @org.jetbrains.annotations.Nullable
    public abstract java.lang.Object loadRegistersFromDateDescendly(@org.jetbrains.annotations.NotNull
    java.lang.String dayMonthAndYear, @org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    java.lang.String tag, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super java.util.List<com.ifinancas.data.dataclass.Register>> $completion);
    
    @org.jetbrains.annotations.Nullable
    public abstract java.lang.Object saveRegister(@org.jetbrains.annotations.NotNull
    java.util.HashMap<java.lang.String, java.lang.Object> registerData, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function0<kotlin.Unit> onSuccess, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function0<kotlin.Unit> onFailure, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super java.lang.Boolean> $completion);
    
    @org.jetbrains.annotations.Nullable
    public abstract java.lang.Object deleteRegister(@org.jetbrains.annotations.NotNull
    java.lang.String id, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function0<kotlin.Unit> onSuccessDelete, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function0<kotlin.Unit> onFailureDelete, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super kotlin.Unit> $completion);
    
    @kotlin.Metadata(mv = {1, 9, 0}, k = 3, xi = 48)
    public static final class DefaultImpls {
    }
}