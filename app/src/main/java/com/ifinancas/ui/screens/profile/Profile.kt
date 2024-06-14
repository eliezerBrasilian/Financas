package com.ifinancas.ui.screens.profile

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.ifinancas.navigation.CustomTopBar
import com.ifinancas.ui.components.ProfileOverlayView
import com.ifinancas.ui.components.ProfileTop
import com.ifinancas.ui.theme.MAINPURPLE
import com.ifinancas.ui.viewModel.UserViewModel


@Composable
fun Profile(
    nav: NavHostController = rememberNavController(),
    userViewModel: UserViewModel,
    clearDataOnExit: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MAINPURPLE)
            .verticalScroll(rememberScrollState())
    ) {
        Column(modifier = Modifier.padding(10.dp)) {
            CustomTopBar("Perfil", color = Color.White, nav)
            ProfileTop(userViewModel)
        }
        Spacer(modifier = Modifier.height(10.dp))
        ProfileOverlayView(clearDataOnExit)
    }
}


