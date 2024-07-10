package com.ifinancas.navigation

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import compose.icons.FontAwesomeIcons
import compose.icons.fontawesomeicons.Solid
import compose.icons.fontawesomeicons.solid.ArrowLeft


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CustomTopBar(
    text: String = "Voltar",
    color: Color = Color.Black,
    nav: NavHostController,
    onClick: () -> Unit = {}
) {
    TopAppBar(title = {
        Text(
            text = text,
            color = color,
            fontSize = 16.sp,
            modifier = Modifier.padding(start = 20.dp)
        )
    },
        navigationIcon = {
            Icon(
                imageVector = FontAwesomeIcons.Solid.ArrowLeft,
                contentDescription = null,
                tint = color,
                modifier = Modifier
                    .size(20.dp)
                    .clickable {
                        nav.popBackStack()
                        onClick()
                    }
            )
        }, colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.Transparent)
    )
}