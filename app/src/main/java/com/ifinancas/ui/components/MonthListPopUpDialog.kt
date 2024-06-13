package com.ifinancas.ui.components

import android.annotation.SuppressLint
import android.view.animation.OvershootInterpolator
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ifinancas.services.DateTimeService
import com.ifinancas.ui.theme.MAINBLUE
import com.ifinancas.ui.viewModel.DateTimeViewModel

@Preview
@SuppressLint("NewApi")
@Composable
fun MonthListPopUpDialog(
    onDismissRequest: () -> Unit = {},
    monthSelected: String = "",
    onChangeMonthItem: (month: String) -> Unit = {},
    monthListVisible: Boolean = false
) {

    val dateTimeViewModel:DateTimeViewModel = hiltViewModel()

    val months by remember {
        mutableStateOf(dateTimeViewModel.getMonths())
    }

/*    val isNeedExpansion by remember{ mutableStateOf(false) }

    val animatedSizeDp: Dp by animateDpAsState(targetValue = if (isNeedExpansion) 350.dp else 100.dp)*/


    val scale by remember {
        mutableStateOf(Animatable(0f))
    }

    LaunchedEffect(key1 = true, block = {
        scale.animateTo(0.9f, animationSpec = tween(800, easing = {
            OvershootInterpolator(2f).getInterpolation(it)
        }))
    })


    Box(modifier = Modifier
        .fillMaxSize()
        .padding(top = 95.dp, start = 20.dp, end = 20.dp)) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .scale(scale.value),
            colors = CardDefaults.cardColors(Color.White),
            shape = RoundedCornerShape(15.dp), elevation = CardDefaults.cardElevation(10.dp)
        ) {
            LazyColumn {
                items(months) {
                    MonthListPopUpDialogItem(
                        text = it,
                        monthSelected = monthSelected,
                        onChangeMonthItem = onChangeMonthItem
                    )
                }
            }
        }
    }
}


@Preview
@Composable
fun MonthListPopUpDialogItem(
    text: String = "Item",
    monthSelected: String = "",
    onChangeMonthItem: (month: String) -> Unit = {}
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onChangeMonthItem(text) },
        verticalArrangement = Arrangement.Center
    ) {
        Spacer(modifier = Modifier.height(5.dp))
        if (monthSelected == text) {
            Box(
                modifier = Modifier.background(Color.LightGray),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = text,
                    color = MAINBLUE,
                    fontSize = 16.sp,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.fillMaxWidth()
                )
            }
        } else {
            Text(
                text = text,
                color = Color.Black,
                fontSize = 16.sp,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth()
            )
        }
        Spacer(modifier = Modifier.height(5.dp))
        Line()
    }
}
