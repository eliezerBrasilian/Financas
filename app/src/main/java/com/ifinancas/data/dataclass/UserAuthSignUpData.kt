package com.ifinancas.data.dataclass

data class UserAuthSignUpData(
    val uid: String,
    val email: String,
    val name: String,
    val profilePicture: String?,
    val isPremium: Boolean,
    val isAdmin: Boolean,
    val createdAt: Long,
);