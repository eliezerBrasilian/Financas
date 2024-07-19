package com.ifinancas.services.impl;

import android.annotation.SuppressLint;
import android.util.Log;
import com.google.firebase.Timestamp;
import com.ifinancas.services.DateTimeService;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import javax.inject.Inject;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000<\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010 \n\u0002\u0010\u000e\n\u0000\n\u0002\u0010$\n\u0002\b\u0002\n\u0002\u0010\t\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0003\n\u0002\u0018\u0002\n\u0002\b\u0003\n\u0002\u0010\b\n\u0002\b\f\u0018\u00002\u00020\u0001B\u0007\b\u0007\u00a2\u0006\u0002\u0010\u0002J\u0010\u0010\b\u001a\u00020\u00052\u0006\u0010\t\u001a\u00020\nH\u0016J\u0010\u0010\u000b\u001a\u00020\f2\u0006\u0010\r\u001a\u00020\fH\u0016J\u0010\u0010\u000e\u001a\u00020\u00052\u0006\u0010\u000f\u001a\u00020\u0010H\u0017J\u0010\u0010\u0011\u001a\u00020\u00052\u0006\u0010\r\u001a\u00020\fH\u0017J\u0010\u0010\u0012\u001a\u0004\u0018\u00010\u00052\u0006\u0010\u0013\u001a\u00020\u0014J\u0010\u0010\u0015\u001a\u00020\u00052\u0006\u0010\u0016\u001a\u00020\fH\u0016J\u0010\u0010\u0015\u001a\u00020\u00052\u0006\u0010\u0017\u001a\u00020\u0005H\u0016J\u0018\u0010\u0018\u001a\u00020\u00052\u0006\u0010\u0019\u001a\u00020\u00052\u0006\u0010\u001a\u001a\u00020\u0014H\u0016J\u0010\u0010\u001b\u001a\u00020\u00052\u0006\u0010\r\u001a\u00020\fH\u0016J\u000e\u0010\u001c\u001a\b\u0012\u0004\u0012\u00020\u00050\u0004H\u0016J\u0010\u0010\u001d\u001a\n\u0012\u0006\u0012\u0004\u0018\u00010\u00050\u0004H\u0016J\b\u0010\u001e\u001a\u00020\fH\u0016J\u0010\u0010\u001f\u001a\u00020\f2\u0006\u0010\r\u001a\u00020\fH\u0016R\u0014\u0010\u0003\u001a\b\u0012\u0004\u0012\u00020\u00050\u0004X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u001a\u0010\u0006\u001a\u000e\u0012\u0004\u0012\u00020\u0005\u0012\u0004\u0012\u00020\u00050\u0007X\u0082\u0004\u00a2\u0006\u0002\n\u0000\u00a8\u0006 "}, d2 = {"Lcom/ifinancas/services/impl/DateTimeServiceImpl;", "Lcom/ifinancas/services/DateTimeService;", "()V", "months", "", "", "monthsThatCanBeSelected", "", "convertMillisecondsToMonthAndYear", "milliseconds", "", "decreaseMonth", "Ljava/util/Date;", "date", "formatTimestamp", "timestamp", "Lcom/google/firebase/Timestamp;", "getDateFormatted", "getMonth", "monthInNumber", "", "getMonthAndYear", "data", "monthSelected", "getMonthAndYearFromGivenMonthWritten", "monthName", "year", "getMonthName", "getMonths", "getPastFourMonths", "getYesterday", "increaseMonth", "app_debug"})
public final class DateTimeServiceImpl implements com.ifinancas.services.DateTimeService {
    @org.jetbrains.annotations.NotNull
    private final java.util.List<java.lang.String> months = null;
    @org.jetbrains.annotations.NotNull
    private final java.util.Map<java.lang.String, java.lang.String> monthsThatCanBeSelected = null;
    
    @javax.inject.Inject
    public DateTimeServiceImpl() {
        super();
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.NotNull
    public java.util.List<java.lang.String> getMonths() {
        return null;
    }
    
    @org.jetbrains.annotations.Nullable
    public final java.lang.String getMonth(int monthInNumber) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.NotNull
    public java.util.List<java.lang.String> getPastFourMonths() {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.NotNull
    public java.lang.String convertMillisecondsToMonthAndYear(long milliseconds) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.NotNull
    public java.util.Date getYesterday() {
        return null;
    }
    
    @java.lang.Override
    @android.annotation.SuppressLint(value = {"NewApi"})
    @org.jetbrains.annotations.NotNull
    public java.lang.String getDateFormatted(@org.jetbrains.annotations.NotNull
    java.util.Date date) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.NotNull
    public java.lang.String getMonthAndYear(@org.jetbrains.annotations.NotNull
    java.util.Date data) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.NotNull
    public java.lang.String getMonthAndYear(@org.jetbrains.annotations.NotNull
    java.lang.String monthSelected) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.NotNull
    public java.lang.String getMonthAndYearFromGivenMonthWritten(@org.jetbrains.annotations.NotNull
    java.lang.String monthName, int year) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.NotNull
    public java.lang.String getMonthName(@org.jetbrains.annotations.NotNull
    java.util.Date date) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.NotNull
    public java.util.Date increaseMonth(@org.jetbrains.annotations.NotNull
    java.util.Date date) {
        return null;
    }
    
    @java.lang.Override
    @org.jetbrains.annotations.NotNull
    public java.util.Date decreaseMonth(@org.jetbrains.annotations.NotNull
    java.util.Date date) {
        return null;
    }
    
    @java.lang.Override
    @android.annotation.SuppressLint(value = {"NewApi"})
    @org.jetbrains.annotations.NotNull
    public java.lang.String formatTimestamp(@org.jetbrains.annotations.NotNull
    com.google.firebase.Timestamp timestamp) {
        return null;
    }
}