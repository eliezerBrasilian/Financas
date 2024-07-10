package com.ifinancas.ui.components

import android.net.Uri
import android.util.Log
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.ifinancas.R
import com.ifinancas.ui.viewModel.UserViewModel
import com.ifinancas.utils.AppUtils.Companion.AppTag

@Composable
fun ProfileTop(userViewModel: UserViewModel) {
    val name by userViewModel.name.observeAsState(initial = "")
    val email by userViewModel.email.observeAsState(initial = "")
    val photo by userViewModel.photo.observeAsState(initial = null)
    val userUid by userViewModel.uid.observeAsState(initial = "")

    Log.d(AppTag, "imagem é: $photo")

    var edicaoEnabled by remember { mutableStateOf(false) }

    val toogleEdicaoEnabled = {
        edicaoEnabled = !edicaoEnabled
    }

    var selectedImage by remember {
        mutableStateOf<Uri?>(null)
    }

    val launcher =
        rememberLauncherForActivityResult(ActivityResultContracts.OpenDocument()) { uri ->
            selectedImage = uri
            toogleEdicaoEnabled()
        }

    val escolheFotoDePerfil: () -> Unit = {
        launcher.launch(arrayOf("image/*"))
    }

    val salvar: () -> Unit = {
        userViewModel.updateProfilePicture(
            oldProfilePictureReferenceUrl = photo, newProfilePicture = selectedImage.toString(),
            userUid = userUid.toString()
        )
        toogleEdicaoEnabled()
    }

    val descartar = {
        toogleEdicaoEnabled()
        selectedImage = null
    }

    Box(
        modifier = Modifier.fillMaxWidth(),
        contentAlignment = Alignment.Center
    ) {
        Column(
            verticalArrangement = Arrangement.spacedBy(10.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {

            if (photo.isNullOrEmpty()) {
                AsyncImage(
                    model = R.drawable.user,
                    contentDescription = null,
                    modifier = Modifier
                        .size(90.dp)
                        .clip(
                            CircleShape
                        )
                        .clickable { escolheFotoDePerfil() }
                )
            } else {
                AsyncImage(
                    model = if (selectedImage == null) photo else selectedImage,
                    contentDescription = null,
                    contentScale = ContentScale.FillBounds,
                    modifier = Modifier
                        .size(90.dp)
                        .clip(
                            CircleShape
                        )
                        .clickable { escolheFotoDePerfil() }
                )
                if (edicaoEnabled) {
                    ImageButtonsRow(descartar, salvar)
                    Spacer(modifier = Modifier.height(20.dp))
                }
            }

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


