package com.foodfacil.utils

import kotlin.random.Random

fun gerarSenha(tamanho: Int): String {
    val caracteresPermitidos = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[{]}|;:,<.>/?"
    val senha = StringBuilder(tamanho)

    repeat(tamanho) {
        val indice = Random.nextInt(caracteresPermitidos.length)
        senha.append(caracteresPermitidos[indice])
    }

    return senha.toString()
}

