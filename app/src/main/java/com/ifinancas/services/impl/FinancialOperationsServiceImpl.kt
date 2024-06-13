package com.ifinancas.services.impl

import android.util.Log
import com.foodfacil.enums.Collections
import com.google.firebase.Timestamp
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import com.ifinancas.data.dataclass.Register
import com.ifinancas.data.enums.Tags
import com.ifinancas.services.DateTimeService
import com.ifinancas.services.FinancialOperationsService
import com.ifinancas.utils.AppTag
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.tasks.await
import javax.inject.Inject
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException

class FinancialOperationsServiceImpl @Inject constructor(
    val firestore: FirebaseFirestore,
    val dateTimeService: DateTimeService
) : FinancialOperationsService {
    override suspend fun getRevenues(userUid: String, monthName: String): Double {
        var receitas = 0.0;
        val revenueQuerySnapshot =
            firestore.collection(Collections.REGISTERS).whereEqualTo("createdBy", userUid)
                .whereEqualTo("tag", Tags.REVENUE.tag).whereEqualTo(
                    "monthYear", dateTimeService.getMonthAndYearFromGivenMonthWritten(monthName)
                ).whereEqualTo("deleted", false).get().await()

        revenueQuerySnapshot.forEach { document ->
            receitas += document.getDouble("amount") ?: 0.0
        }
        return receitas;
    }

    override suspend fun getReservations(userUid: String, monthName: String): Double {
        var reservas = 0.0

        val reservationQuerySnapshot =
            firestore.collection(Collections.REGISTERS).whereEqualTo("createdBy", userUid)
                .whereEqualTo("tag", Tags.RESERVATION.tag).whereEqualTo(
                    "monthYear", dateTimeService.getMonthAndYearFromGivenMonthWritten(monthName)
                ).get().await()

        reservationQuerySnapshot.forEach { document ->
            reservas += document.getDouble("amount") ?: 0.0
        }

        return reservas;
    }

    override suspend fun getExpenses(userUid: String, monthName: String): Double {
        var despesas = 0.0

        val expenseQuerySnapshot =
            firestore.collection(Collections.REGISTERS).whereEqualTo("createdBy", userUid)
                .whereEqualTo("tag", Tags.EXPENSE.tag).whereEqualTo(
                    "monthYear", dateTimeService.getMonthAndYearFromGivenMonthWritten(monthName)
                ).get().await()

        expenseQuerySnapshot.forEach { document ->
            despesas += document.getDouble("amount") ?: 0.0
        }
        return despesas;
    }

    override suspend fun loadRegistersFromDateDescendly(
        dayMonthAndYear: String,
        userUid: String
    ): List<Register> {
        return suspendCancellableCoroutine { continuation ->
            firestore.collection(Collections.REGISTERS).whereEqualTo("createdBy", userUid)
                .whereEqualTo("monthYear", dayMonthAndYear)
                .whereEqualTo("deleted", false).orderBy("dayMonthYear", Query.Direction.DESCENDING)
                .get().addOnSuccessListener { data ->
                    val listOfRegisters = mutableListOf<Register>()

                    var amount = 0.0

                    data.documents.forEach { i ->
                        Log.d(AppTag, "---data: ${i.data}")
                        val documentData = i.data

                        val documentAmount = documentData?.get("amount")
                        val amountDouble = when (documentAmount) {
                            is Long -> documentAmount.toDouble()
                            is Double -> documentAmount
                            else -> 0.0
                        }

                        amount += amountDouble

                        if (documentData != null) {
                            listOfRegisters.add(
                                Register(
                                    id = i.id,
                                    amount = amountDouble,
                                    category = documentData["category"] as String,
                                    description = documentData["description"] as String,
                                    tag = documentData["tag"] as String,
                                    createdAt = documentData["createdAt"] as Timestamp
                                )
                            )
                        }
                    }
                    continuation.resume(listOfRegisters)
                }.addOnFailureListener { error ->
                    Log.d(AppTag, "registers__ERRORR: $error")
                    continuation.resumeWithException(error)
                }
        }
    }

    override suspend fun loadRegistersFromDateDescendly(
        dayMonthAndYear: String,
        userUid: String,
        tag: String
    ): List<Register> {
        return suspendCancellableCoroutine { continuation ->
            firestore.collection(Collections.REGISTERS)
                .whereEqualTo("createdBy", userUid)
                .whereEqualTo("monthYear", dayMonthAndYear)
                .whereEqualTo("tag", tag.lowercase())
                .whereEqualTo("deleted", false)
                .orderBy("dayMonthYear", Query.Direction.DESCENDING)
                .get().addOnSuccessListener { data ->
                    val listOfRegisters = mutableListOf<Register>()

                    var amount = 0.0

                    data.documents.forEach { i ->
                        Log.d(AppTag, "---data: ${i.data}")
                        val documentData = i.data

                        val documentAmount = documentData?.get("amount")
                        val amountDouble = when (documentAmount) {
                            is Long -> documentAmount.toDouble()
                            is Double -> documentAmount
                            else -> 0.0
                        }

                        amount += amountDouble

                        if (documentData != null) {
                            listOfRegisters.add(
                                Register(
                                    id = i.id,
                                    amount = amountDouble,
                                    category = documentData["category"] as String,
                                    description = documentData["description"] as String,
                                    tag = documentData["tag"] as String,
                                    createdAt = documentData["createdAt"] as Timestamp
                                )
                            )
                        }
                    }
                    continuation.resume(listOfRegisters)
                }.addOnFailureListener { error ->
                    Log.d(AppTag, "registers__ERRORR: $error")
                    continuation.resumeWithException(error)
                }
        }
    }

    override suspend fun saveRegister(registerData: HashMap<String, Any>): Boolean {
        try {
            val colRef = firestore.collection(Collections.REGISTERS)
                .add(registerData)
                .await()
            return true;
        } catch (e: Exception) {
            println("Erro ao registrar: ${e.message}")
            return false;
        }
    }
}