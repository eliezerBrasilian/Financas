
package com.ifinancas.navigation
import androidx.activity.compose.LocalOnBackPressedDispatcherOwner
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.ui.graphics.Color
import com.google.accompanist.systemuicontroller.rememberSystemUiController

@Composable
fun NavigationBarColor(color: Color = Color.White) {
    val systemUiController = rememberSystemUiController()
    val useDarkIcons = true

    val statusBarColor = color
    val navigationBarColor = color

    val dispatcher = LocalOnBackPressedDispatcherOwner.current

    DisposableEffect(systemUiController, dispatcher) {
        systemUiController.setStatusBarColor(
            color = statusBarColor,
            darkIcons = useDarkIcons,
        )
        systemUiController.setNavigationBarColor(
            color = navigationBarColor,
            darkIcons = useDarkIcons
        )

        // Dispose the effect when the composable leaves the composition
        onDispose {
           /* systemUiController.setStatusBarColor(
                color = androidx.compose.ui.graphics.Color.Transparent,
                darkIcons = useDarkIcons,
            )
            systemUiController.setNavigationBarColor(
                color = androidx.compose.ui.graphics.Color.Transparent,
                darkIcons = useDarkIcons
            )*/
        }
    }
}
