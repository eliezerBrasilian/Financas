package com.ifinancas.ui.components

import android.annotation.SuppressLint
import android.view.animation.OvershootInterpolator
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.ifinancas.data.sealedClass.MenuItems

@SuppressLint("NewApi")
@Composable
fun FinancialBalanceSelectedMenu(
    tagSelected: String,
    onChangeTag: (tagSelected: String) -> Unit,
) {

    val scale by remember {
        mutableStateOf(Animatable(0f))
    }

    val items by remember {
        mutableStateOf(
            listOf(
                MenuItems.Revenue,
                MenuItems.Expense,
                MenuItems.Reservation
            )
        )
    }

    LaunchedEffect(key1 = true, block = {
        scale.animateTo(0.9f, animationSpec = tween(800, easing = {
            OvershootInterpolator(2f).getInterpolation(it)
        }))
    })

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 20.dp, start = 20.dp, end = 20.dp),
        contentAlignment = Alignment.TopStart
    ) {
        Card(
            modifier = Modifier
                .width(200.dp)
                .scale(scale.value),
            colors = CardDefaults.cardColors(Color.White),
            shape = RoundedCornerShape(15.dp),

            ) {
            LazyColumn {
                items(items) {
                    FinancialBalanceSelectedMenuItem(
                        item = it,
                        circleColor = it.circleColor,
                        onChangeTag = onChangeTag
                    )
                }
            }
        }
    }
}