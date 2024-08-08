package com.ifinancas.data

import com.ifinancas.R

enum class FinanceCardOrientation {
    HORIZONTAL, VERTICAL
}

enum class FinanceCardCategory {
    FOREST,
    ANIME
}

data class FinanceCard(
    val imageResource: Int,
    val title: String,
    val description: String,
    val category: FinanceCardCategory = FinanceCardCategory.FOREST,
    val orientation: FinanceCardOrientation = FinanceCardOrientation.VERTICAL
)

val cardList = listOf(
    FinanceCard(
        R.drawable.florest_wallpaper_1,
        "Mars Forest",
        "Sol rejuvenescedor de fim de tarde"
    ),
    FinanceCard(
        R.drawable.forest_1,
        "Mars Forest",
        "Sol rejuvenescedor de fim de tarde"
    ),
    FinanceCard(
        R.drawable.forest_2,
        "Mars Forest",
        "Sol rejuvenescedor de fim de tarde"
    ),

    FinanceCard(
        R.drawable.sasuke1,
        "Asas do Vingador",
        "Uchiha Sasuske o viajante negro",
        category = FinanceCardCategory.ANIME
    ),

    FinanceCard(
        R.drawable.naruto,
        "Mars Forest",
        "Sol rejuvenescedor de fim de tarde",
        category = FinanceCardCategory.ANIME
    ),

    FinanceCard(
        R.drawable.madara,
        "Mars Forest",
        "Sol rejuvenescedor de fim de tarde",
        category = FinanceCardCategory.ANIME
    ),

    FinanceCard(
        R.drawable.uchiha,
        "Mars Forest",
        "Sol rejuvenescedor de fim de tarde",
        category = FinanceCardCategory.ANIME
    ),
)