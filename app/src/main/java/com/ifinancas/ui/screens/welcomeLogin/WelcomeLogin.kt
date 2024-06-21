package com.ifinancas.ui.screens.welcomeLogin

import android.app.Activity
import android.content.Context
import android.util.Log
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Button
import androidx.compose.material.Icon
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.ifinancas.R
import com.ifinancas.data.dataclass.FirebaseUserResponse
import com.ifinancas.data.gitignore.clientId
import com.ifinancas.navigation.ArrowBackTop
import com.ifinancas.navigation.NavigationScreens
import com.ifinancas.services.getGoogleLoginAuth
import com.ifinancas.ui.components.GoogleAuthButton
import com.ifinancas.ui.theme.MAINBLUE
import com.ifinancas.ui.viewModel.AuthViewModel
import com.ifinancas.ui.viewModel.UserViewModel
import com.ifinancas.utils.AppUtils
import kotlinx.coroutines.launch


@Composable
fun GoogleSignInPopUp(
    clientId: String,
    context: Context,
    onSuccess: (result: GoogleSignInAccount) -> Unit
) {
    val googleSignInClient = getGoogleLoginAuth(clientId, context)
    val startForResult =
        rememberLauncherForActivityResult(ActivityResultContracts.StartActivityForResult()) { activityResult ->
            if (activityResult.resultCode == Activity.RESULT_OK) {
                val intent = activityResult.data
                if (intent != null) {
                    val task = GoogleSignIn.getSignedInAccountFromIntent(intent)
                    val result = task.result
                    if (result != null) {
                        onSuccess(result)
                    }
                }
            }
        }
    LaunchedEffect(Unit) {
        startForResult.launch(googleSignInClient.signInIntent)
    }
}

@Composable
fun rememberGoogleSignUp(
    clientId: String,
    context: Context,
    onSuccess: (result: GoogleSignInAccount) -> Unit
): () -> Unit {
    var showGoogleSignInPopUp by remember { mutableStateOf(false) }

    if (showGoogleSignInPopUp) {
        GoogleSignInPopUp(
            clientId = clientId,
            context = context,
            onSuccess = { result ->
                onSuccess(result)
                showGoogleSignInPopUp = false
            }
        )
    }

    // Return a lambda to trigger the Google Sign-In process
    return {
        showGoogleSignInPopUp = true
    }
}


@Composable
fun WelcomeLogin(
    nav: NavHostController = rememberNavController(),
    authViewModel: AuthViewModel,
    userViewModel: UserViewModel
) {

    val isLoading by authViewModel.loading.observeAsState(initial = false)

    val scope = rememberCoroutineScope()

    val onSuccess: (user: FirebaseUserResponse) -> Unit = { user ->
        scope.launch {
            Log.d(AppUtils.AppTag, "useruid: ${user.uid}")
            userViewModel.saveEmail(user.email)
            userViewModel.saveUid(user.uid)
            userViewModel.saveName(user.name)
            user.profilePicture?.let { userViewModel.savePhoto(it) }

            nav.navigate("appNavigation") {
                popUpTo("authNavigation") {
                    inclusive = true
                }
            }
        }
    }

    val onClickGoogleSignIn = rememberGoogleSignUp(
        clientId = clientId,
        context = LocalContext.current,
        onSuccess = { result ->
            authViewModel.loginWithGoogle(
                email = result.email!!,
                name = result.displayName!!,
                userUid = result.id!!,
                photo = result.photoUrl,
                onError = {},
                onSuccess = onSuccess
            )
        }
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .padding(15.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        ArrowBackTop(nav = nav)

        Spacer(modifier = Modifier.height(40.dp))
        Row(
            modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Image(
                painter = painterResource(id = R.drawable.mao),
                contentDescription = null,
                modifier = Modifier
                    .height(30.dp)
                    .width(30.dp)
            )
            Spacer(modifier = Modifier.width(10.dp))
            Text(
                text = "Bem vindo(a) de volta!",
                color = Color.Black,
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp,

                )

        }


        Image(
            painter = painterResource(id = R.drawable.pessoas_login),
            contentDescription = null,
            modifier = Modifier
                .height(300.dp)
                .width(240.dp)
        )

        Text(
            text = "É bom vê-lo novamente, continue alcançando seu sucesso",
            color = Color.DarkGray,
            fontWeight = FontWeight.Medium,
            fontSize = 15.sp,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Start
        )

        Spacer(modifier = Modifier.height(50.dp))
        Button(
            onClick = { nav.navigate(NavigationScreens.LOGIN) }, modifier = Modifier
                .fillMaxWidth()
                .height(50.dp)
                .border(width = 1.dp, color = MAINBLUE, shape = RoundedCornerShape(9.dp))
        ) {
            Icon(imageVector = Icons.Default.Email, contentDescription = null)
            Spacer(modifier = Modifier.width(10.dp))
            Text(
                text = "Continuar com email",
                color = Color.White,
                fontWeight = FontWeight.Medium,
                fontSize = 13.sp
            )
        }
        Spacer(modifier = Modifier.height(15.dp))
        GoogleAuthButton(isLoading = isLoading, onClick = { onClickGoogleSignIn() })
        Spacer(modifier = Modifier.height(15.dp))
        Text(
            text = "Não consigo fazer login",
            color = MAINBLUE,
            fontWeight = FontWeight.Medium,
            fontSize = 13.sp
        )
    }
}
