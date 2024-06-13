package com.ifinancas.data.dataclass

import com.google.firebase.Timestamp

data class Register(
    val id: String,
    val amount: Double,
    val description: String,
    val tag: String,
    val category: String,
    val createdAt: Timestamp
)


/*
{createdAt=Timestamp(seconds=1717295197,
nanoseconds=470000000), amount=32, deleted=false,
createdBy=yJUXkB5FdrYFKsgQ8w6P8EgPmnH2,
monthYear=06/2024,
 dayMonthYear=01/06/2024,
 category=Investimento}
 */