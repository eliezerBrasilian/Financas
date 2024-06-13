package com.ifinancas.screens

import android.view.animation.OvershootInterpolator
import androidx.activity.ComponentActivity
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.ifinancas.R
import com.ifinancas.ui.viewModel.UserViewModel
import kotlinx.coroutines.delay

@Preview
@Composable
fun Splash(
    nav: NavHostController = rememberNavController(),
) {
    val userViewModel: UserViewModel = hiltViewModel()
    val userUid by userViewModel.uid.observeAsState(initial = "")

    val scale by remember {
        mutableStateOf(Animatable(0f))
    }

    val context = LocalContext.current as ComponentActivity
    LaunchedEffect(key1 = true, block = {

        scale.animateTo(0.9f, animationSpec = tween(800, easing = {
            OvershootInterpolator(8f).getInterpolation(it)
        }))

        delay(1500L)

         if (userUid.isNullOrEmpty()) {
             nav.navigate("authNavigation"){
                 popUpTo("splashNav") { inclusive = true }
                 launchSingleTop = true
             }
        }
         else {
             nav.navigate("appNavigation"){
                 popUpTo("splashNav") { inclusive = true }
                 launchSingleTop = true
             }
        }
    })

    Surface(modifier = Modifier.fillMaxSize(), color = Color.White) {

        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Column(
                modifier = Modifier
                    .size(400.dp)
                    .scale(scale.value),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Image(
                    painter = painterResource(id = R.drawable.logo_iniciar),
                    null,
                    modifier = Modifier.size(300.dp)
                )
            }
            Spacer(modifier = Modifier.padding(top = 30.dp))
        }

    }

}