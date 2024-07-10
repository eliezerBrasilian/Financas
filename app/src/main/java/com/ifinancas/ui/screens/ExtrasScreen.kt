package com.ifinancas.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.ifinancas.R
import com.ifinancas.ui.components.OutrosExtraColumn
import com.ifinancas.ui.components.RendaExtraColumn

@Preview
@Composable
fun ExtrasScreen(
    pv: PaddingValues = PaddingValues(0.dp),
    navController: NavHostController = rememberNavController()
) {

    Surface(Modifier.padding(pv), color = Color.White) {
        Column(
            modifier = Modifier
                .padding(15.dp)
                .fillMaxSize()
                .background(Color.White)
                .verticalScroll(rememberScrollState())
        ) {

            Image(
                painter = painterResource(id = R.drawable.img_premium),
                contentDescription = null,
                modifier = Modifier.height(200.dp)
            )
            RendaExtraColumn()
            OutrosExtraColumn()
            /* OfertasColumn()*/
        }
    }
}


