package com.ifinancas.data.dataclass

data class UserAuthDto(
    val email: String,
    val password: String,
    val name: String,
    val profilePicture: String?
)