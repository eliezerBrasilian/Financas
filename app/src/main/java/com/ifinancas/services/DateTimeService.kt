package com.ifinancas.services

import android.annotation.SuppressLint
import com.google.firebase.Timestamp
import java.text.SimpleDateFormat
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.*

interface DateTimeService {

    fun getMonths(): List<String>

    fun getPastFourMonths(): List<String?>

    fun convertMillisecondsToMonthAndYear(milliseconds: Long): String

    fun getYesterday(): Date

    @SuppressLint("NewApi")
    fun getDateFormatted(date: Date = Date()): String

    fun getMonthAndYear(data: Date = Date()): String

    fun getMonthAndYear(monthSelected: String): String

    fun getMonthAndYearFromGivenMonthWritten(
        monthName: String = "Janeiro",
        year: Int = Calendar.getInstance().get(Calendar.YEAR)
    ): String

    fun getMonthName(date: Date = Date()): String

    fun increaseMonth(date: Date): Date

    fun decreaseMonth(date: Date): Date

    @SuppressLint("NewApi")
    fun formatTimestamp(timestamp: Timestamp): String
}
