package com.ifinancas.ui.components

import android.util.Log
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.ifinancas.R
import com.ifinancas.ui.viewModel.UserViewModel
import com.ifinancas.utils.AppTag

@Composable
fun ProfileTop(userViewModel: UserViewModel) {
    val name by userViewModel.name.observeAsState(initial = "")
    val email by userViewModel.email.observeAsState(initial = "")
    val photo by userViewModel.photo.observeAsState(initial = null)

    Log.d(AppTag,"imagem é: $photo")

    Box(modifier = Modifier.fillMaxWidth(),
        contentAlignment = Alignment.Center) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            AsyncImage(model = if(photo.isNullOrEmpty()) R.drawable.user_profile else photo,
                contentDescription = null,
                modifier = Modifier
                    .size(90.dp)
                    .clip(
                        CircleShape
                    ))

            Text(
                text = name.toString(),
                fontSize = 17.sp,
                color = Color.White,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = email.toString(),
                fontSize = 14.sp,
                color = Color.White,
                fontWeight = FontWeight.Normal
            )
        }
    }
    Spacer(modifier = Modifier.height(20.dp))
    ProfileBottomStatusView()
}

@Composable
private fun ProfileBottomStatusView() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color(0xff0B032D), shape = RoundedCornerShape(10.dp))
            .padding(10.dp)
    ) {
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceAround) {
            ProfileBottomStatusViewItem(toptext = "Status", bottomText = "Conta gratuita", R.drawable.crown_status)
            ProfileBottomStatusViewItem(toptext = "Conta ativa desde", bottomText = "01/2024", R.drawable.calendar)
            }
    }
}
@Preview
@Composable
private fun ProfileBottomStatusViewItem(toptext:String = "", bottomText:String = "", icon:Int = R.drawable.crown_status) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Image(
            painter = painterResource(id = icon),
            contentDescription = null,
            modifier = Modifier
                .size(17.dp)
                .clip(
                    CircleShape
                )
        )
        Column {
            Text(
                text = toptext,
                fontSize = 10.sp,
                color = Color.White,
                fontWeight = FontWeight.Normal
            )
            Text(
                text = bottomText,
                fontSize = 14.sp,
                color = Color.White,
                fontWeight = FontWeight.Normal
            )
        }
    }
}