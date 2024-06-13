package com.ifinancas.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import com.ifinancas.R
import com.ifinancas.ui.viewModel.AuthViewModel
import com.ifinancas.ui.viewModel.UserViewModel

@Composable
fun ProfileOverlayView(
    clearDataOnExit: () -> Unit
) {
    val userViewModel: UserViewModel = hiltViewModel()
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White, RoundedCornerShape(topStart = 12.dp, topEnd = 12.dp))
    ) {
        ProfileOverlayViewItem(text = "Finanças extras", icon = R.drawable.crown_list)
        Line()
        ProfileOverlayViewItem(text = "Encerrar sessão", icon = R.drawable.logout){
            clearDataOnExit()
        }
        Line()
    }
}