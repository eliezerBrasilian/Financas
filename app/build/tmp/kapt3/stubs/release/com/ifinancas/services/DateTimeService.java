package com.ifinancas.services;

import android.annotation.SuppressLint;
import com.google.firebase.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u00006\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0000\n\u0002\u0010\u000e\n\u0000\n\u0002\u0010\t\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0003\n\u0002\u0018\u0002\n\u0002\b\u0007\n\u0002\u0010\b\n\u0002\b\u0002\n\u0002\u0010 \n\u0002\b\u0004\bf\u0018\u00002\u00020\u0001J\u0010\u0010\u0002\u001a\u00020\u00032\u0006\u0010\u0004\u001a\u00020\u0005H&J\u0010\u0010\u0006\u001a\u00020\u00072\u0006\u0010\b\u001a\u00020\u0007H&J\u0010\u0010\t\u001a\u00020\u00032\u0006\u0010\n\u001a\u00020\u000bH\'J\u0012\u0010\f\u001a\u00020\u00032\b\b\u0002\u0010\b\u001a\u00020\u0007H\'J\u0012\u0010\r\u001a\u00020\u00032\b\b\u0002\u0010\u000e\u001a\u00020\u0007H&J\u0010\u0010\r\u001a\u00020\u00032\u0006\u0010\u000f\u001a\u00020\u0003H&J\u001c\u0010\u0010\u001a\u00020\u00032\b\b\u0002\u0010\u0011\u001a\u00020\u00032\b\b\u0002\u0010\u0012\u001a\u00020\u0013H&J\u0012\u0010\u0014\u001a\u00020\u00032\b\b\u0002\u0010\b\u001a\u00020\u0007H&J\u000e\u0010\u0015\u001a\b\u0012\u0004\u0012\u00020\u00030\u0016H&J\u0010\u0010\u0017\u001a\n\u0012\u0006\u0012\u0004\u0018\u00010\u00030\u0016H&J\b\u0010\u0018\u001a\u00020\u0007H&J\u0010\u0010\u0019\u001a\u00020\u00072\u0006\u0010\b\u001a\u00020\u0007H&\u00a8\u0006\u001a"}, d2 = {"Lcom/ifinancas/services/DateTimeService;", "", "convertMillisecondsToMonthAndYear", "", "milliseconds", "", "decreaseMonth", "Ljava/util/Date;", "date", "formatTimestamp", "timestamp", "Lcom/google/firebase/Timestamp;", "getDateFormatted", "getMonthAndYear", "data", "monthSelected", "getMonthAndYearFromGivenMonthWritten", "monthName", "year", "", "getMonthName", "getMonths", "", "getPastFourMonths", "getYesterday", "increaseMonth", "app_release"})
public abstract interface DateTimeService {
    
    @org.jetbrains.annotations.NotNull
    public abstract java.util.List<java.lang.String> getMonths();
    
    @org.jetbrains.annotations.NotNull
    public abstract java.util.List<java.lang.String> getPastFourMonths();
    
    @org.jetbrains.annotations.NotNull
    public abstract java.lang.String convertMillisecondsToMonthAndYear(long milliseconds);
    
    @org.jetbrains.annotations.NotNull
    public abstract java.util.Date getYesterday();
    
    @android.annotation.SuppressLint(value = {"NewApi"})
    @org.jetbrains.annotations.NotNull
    public abstract java.lang.String getDateFormatted(@org.jetbrains.annotations.NotNull
    java.util.Date date);
    
    @org.jetbrains.annotations.NotNull
    public abstract java.lang.String getMonthAndYear(@org.jetbrains.annotations.NotNull
    java.util.Date data);
    
    @org.jetbrains.annotations.NotNull
    public abstract java.lang.String getMonthAndYear(@org.jetbrains.annotations.NotNull
    java.lang.String monthSelected);
    
    @org.jetbrains.annotations.NotNull
    public abstract java.lang.String getMonthAndYearFromGivenMonthWritten(@org.jetbrains.annotations.NotNull
    java.lang.String monthName, int year);
    
    @org.jetbrains.annotations.NotNull
    public abstract java.lang.String getMonthName(@org.jetbrains.annotations.NotNull
    java.util.Date date);
    
    @org.jetbrains.annotations.NotNull
    public abstract java.util.Date increaseMonth(@org.jetbrains.annotations.NotNull
    java.util.Date date);
    
    @org.jetbrains.annotations.NotNull
    public abstract java.util.Date decreaseMonth(@org.jetbrains.annotations.NotNull
    java.util.Date date);
    
    @android.annotation.SuppressLint(value = {"NewApi"})
    @org.jetbrains.annotations.NotNull
    public abstract java.lang.String formatTimestamp(@org.jetbrains.annotations.NotNull
    com.google.firebase.Timestamp timestamp);
    
    @kotlin.Metadata(mv = {1, 9, 0}, k = 3, xi = 48)
    public static final class DefaultImpls {
    }
}