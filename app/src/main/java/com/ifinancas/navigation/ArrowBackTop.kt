package com.ifinancas.navigation

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.size
import androidx.compose.material.Icon
import androidx.compose.material.TopAppBar
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowLeft
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.ifinancas.ui.theme.MAINBLUE

@Composable
fun ArrowBackTop(nav:NavHostController){
    TopAppBar(title = { /*TODO*/ },
        navigationIcon = {
            Icon(imageVector = Icons.Default.KeyboardArrowLeft,
                contentDescription = null,
                tint = MAINBLUE,
                modifier = Modifier
                .size(40.dp)
                .clickable { nav.popBackStack() })
        }, backgroundColor = Color.White, elevation = 0.dp)
}
