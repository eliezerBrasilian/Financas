package com.ifinancas.data

import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.googlefonts.Font
import androidx.compose.ui.text.googlefonts.GoogleFont
import com.ifinancas.R

val provider = GoogleFont.Provider(
    providerAuthority = "com.google.android.gms.fonts",
    providerPackage = "com.google.android.gms",
    certificates = R.array.com_google_android_gms_fonts_certs
)

val pavanamFamily = FontFamily(
    Font(googleFont = GoogleFont("Pavanam"), fontProvider = provider)
)
val montserratFamily = FontFamily(
    Font(googleFont = GoogleFont("Montserrat"), fontProvider = provider)
)
