package com.ifinancas.services.impl

import android.annotation.SuppressLint
import android.util.Log
import com.google.firebase.Timestamp
import com.ifinancas.services.DateTimeService
import com.ifinancas.utils.AppUtils.Companion.AppTag
import java.text.SimpleDateFormat
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.Calendar
import java.util.Date
import java.util.Locale
import javax.inject.Inject

class DateTimeServiceImpl @Inject constructor() : DateTimeService {
    private val months = listOf(
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    )
    private val monthsThatCanBeSelected = mapOf(
        "CURRENT" to "current",
        "PAST_MONTH" to "pastMonth",
        "THREE_MONTHS_AGO" to "threeMonthsAgo",
        "FOUR_MONTHS_AGO" to "fourMonthsAgo",
        "FIVE_MONTHS_AGO" to "fiveMonthsAgo"
    )


    override fun getMonths(): List<String> {
        return months
    }

    fun getMonth(monthInNumber: Int): String? {
        return when (monthInNumber) {
            -2 -> "Outubro"
            -1 -> "Novembro"
            0 -> "Dezembro"
            1 -> "Janeiro"
            2 -> "Fevereiro"
            3 -> "Março"
            4 -> "Abril"
            5 -> "Maio"
            6 -> "Junho"
            7 -> "Julho"
            8 -> "Agosto"
            9 -> "Setembro"
            10 -> "Outubro"
            11 -> "Novembro"
            12 -> "Dezembro"
            else -> null
        }
    }

    override fun getPastFourMonths(): List<String?> {
        val currentDate = Calendar.getInstance()
        val currentMonth = currentDate.get(Calendar.MONTH) + 1
        val lastMonth = currentDate.get(Calendar.MONTH)
        val threeMonthsAgo = currentDate.get(Calendar.MONTH) - 1
        val fourMonthsAgo = currentDate.get(Calendar.MONTH) - 2

        return listOf(
            getMonth(fourMonthsAgo),
            getMonth(threeMonthsAgo),
            getMonth(lastMonth),
            getMonth(currentMonth)
        )
    }

    override fun convertMillisecondsToMonthAndYear(milliseconds: Long): String {
        val date = Date(milliseconds)
        val formatter = SimpleDateFormat("MM/yyyy", Locale("pt", "BR"))
        return formatter.format(date)
    }

    override fun getYesterday(): Date {
        val today = Calendar.getInstance()
        val yesterday = Calendar.getInstance()
        yesterday.add(Calendar.DATE, -1)
        return yesterday.time
    }

    @SuppressLint("NewApi")
    override fun getDateFormatted(date: Date): String {
        // Converting java.util.Date to java.time.LocalDate
        val localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
        val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy")
        return localDate.format(formatter)
    }

    override fun getMonthAndYear(data: Date): String {
        val mes = (data.month + 1).toString().padStart(2, '0')
        val ano = data.year + 1900 // Year is stored as the number of years since 1900

        return "$mes/$ano"
    }


    override fun getMonthAndYear(monthSelected: String): String {
        val date = Calendar.getInstance()
        var year = date.get(Calendar.YEAR)
        val month: Int = when (monthSelected) {
            monthsThatCanBeSelected["CURRENT"] -> date.get(Calendar.MONTH) + 1
            monthsThatCanBeSelected["PAST_MONTH"] -> {
                if (date.get(Calendar.MONTH) == 0) {
                    year -= 1
                    12
                } else {
                    date.get(Calendar.MONTH)
                }
            }

            monthsThatCanBeSelected["THREE_MONTHS_AGO"] -> {
                if (date.get(Calendar.MONTH) == 0) {
                    year -= 1
                    11
                } else {
                    date.get(Calendar.MONTH) - 1
                }
            }

            else -> {
                if (date.get(Calendar.MONTH) == 0) {
                    year -= 1
                    10
                } else {
                    date.get(Calendar.MONTH) - 2
                }
            }
        }
        return "${month.toString().padStart(2, '0')}/$year"
    }

    override fun getMonthAndYearFromGivenMonthWritten(monthName: String, year: Int): String {
        val monthIndex = months.indexOfFirst { it.equals(monthName, ignoreCase = true) }
        if (monthIndex == -1) {
            Log.d(AppTag, "mês: $monthName")
            throw IllegalArgumentException("Nome do mês inválido.")
        }
        val month = (monthIndex + 1).toString().padStart(2, '0')
        return "$month/$year"
    }

    override fun getMonthName(date: Date): String {
        val calendar = Calendar.getInstance()
        calendar.time = date
        val numberOfMonth = calendar.get(Calendar.MONTH)
        return months[numberOfMonth]
    }

    override fun increaseMonth(date: Date): Date {
        val calendar = Calendar.getInstance()
        calendar.time = date
        calendar.add(Calendar.MONTH, 1)
        return calendar.time
    }

    override fun decreaseMonth(date: Date): Date {
        val calendar = Calendar.getInstance()
        calendar.time = date
        calendar.add(Calendar.MONTH, -1)
        return calendar.time
    }

    @SuppressLint("NewApi")
    override fun formatTimestamp(timestamp: Timestamp): String {
        // Convert Timestamp to Instant
        val instant = Instant.ofEpochSecond(timestamp.seconds, timestamp.nanoseconds.toLong())

        // Convert Instant to LocalDateTime
        val localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault())

        // Define the formatter
        val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy 'às' HH:mm:ss")

        // Format the LocalDateTime and return the result
        return localDateTime.format(formatter)
    }
}