package com.ifinancas.data.dataclass

data class FirebaseUserResponse(
    val createdAt: Long,
    val profilePicture: String?,
    val uid: String,
    val name: String,
    val isPremium: Boolean,
    val isAdmin: Boolean,
    val email: String
)