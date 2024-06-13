package com.ifinancas.ui.components

import android.annotation.SuppressLint
import android.view.animation.OvershootInterpolator
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
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
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.data.enums.MenuItem

@SuppressLint("NewApi")
@Composable
fun HomePopUpMenu(
    onChangeMenuItem: (menuItem: MenuItem) -> Unit = {},
) {

    val scale by remember {
        mutableStateOf(Animatable(0f))
    }

    val items by remember {
        mutableStateOf(
            listOf(
                MenuItem.Perfil,
                MenuItem.Extras,
                MenuItem.Avaliar,
                MenuItem.Compartilhar
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
            .fillMaxSize()
            .padding(top = 65.dp, start = 20.dp, end = 20.dp),
        contentAlignment = Alignment.TopEnd
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
                    HomePopUpMenuItem(item = it, onChangeMenuItem = onChangeMenuItem)
                }
            }
        }
    }
}

@Composable
fun HomePopUpMenuItem(
    item: MenuItem,
    onChangeMenuItem: (item: MenuItem) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onChangeMenuItem(item) },
        verticalArrangement = Arrangement.Center
    ) {
        Spacer(modifier = Modifier.height(5.dp))
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            modifier = Modifier.padding(start = 10.dp, top = 10.dp)
        ) {
            Image(painter = painterResource(id = item.icon), contentDescription = null)
            Text(text = item.title, color = Color.Black, fontSize = 16.sp)
        }

        Spacer(modifier = Modifier.height(5.dp))
        Line()
    }
}
