package com.ifinancas.ui.screens

import android.app.Activity
import android.widget.Toast
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.adapty.Adapty
import com.adapty.models.AdaptyPaywallProduct
import com.adapty.utils.AdaptyResult
import com.ifinancas.R
import com.ifinancas.data.pavanamFamily
import com.ifinancas.ui.components.BackgroundImage
import com.ifinancas.ui.components.BenefitRow
import com.ifinancas.ui.components.CircleClose
import compose.icons.FontAwesomeIcons
import compose.icons.fontawesomeicons.Solid
import compose.icons.fontawesomeicons.solid.Star

@Preview
@Composable
fun PaywallScreen(placementId: String = "i_financas_placement") {
    val productState = remember { mutableStateOf<AdaptyPaywallProduct?>(null) }

    val productStateTest = 20.4;

    BackgroundImage(imageResource = R.drawable.bg1) {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Image(
                painter = painterResource(id = R.drawable.florest_wallpaper_1),
                contentDescription = null,
                modifier = Modifier.size(300.dp)
            )

            Spacer(modifier = Modifier.height(25.dp))
            Text(
                text = "Evolua com o Finanças", fontSize = 23.sp, color = Color.White,
                fontWeight = FontWeight.Bold,
                fontFamily = pavanamFamily
            )
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.Center
            ) {
                repeat(5) {
                    Icon(
                        imageVector = FontAwesomeIcons.Solid.Star, contentDescription = null,
                        tint = Color.Yellow,
                        modifier = Modifier.size(50.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(25.dp))
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp)
            ) {
                Column() {
                    BenefitRow(text = "Decoração de Avatar")
                    BenefitRow(text = "Remoção de Anúncios")
                    BenefitRow(text = "Alterar ícone do App")
                    BenefitRow(text = "Decoração de Avatar")
                }
            }

            Spacer(modifier = Modifier.height(25.dp))
            Text(
                text = "${productStateTest.toString()} / mensal, cancele quando quiser ",
                fontSize = 16.sp,
                color = Color(0xff06b4ca),
                fontWeight = FontWeight.W500,
                fontFamily = pavanamFamily
            )

            Spacer(modifier = Modifier.height(25.dp))
            Button(
                onClick = { /*TODO*/ },
                colors = ButtonDefaults.buttonColors(Color(0xff048ece)),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp),
                contentPadding = PaddingValues(14.dp),
                shape = RoundedCornerShape(9.dp)
            ) {
                Text(
                    text = "CONTINUAR", fontSize = 23.sp, color = Color.White,
                    fontWeight = FontWeight.Medium,
                    fontFamily = pavanamFamily
                )
            }
        }
    }

    CircleClose()
}

@Composable
fun PaywallProductList(products: List<AdaptyPaywallProduct>) {


    val activity = LocalContext.current as? Activity

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        products.forEach { product ->
            Text(text = product.variationId)
            Spacer(modifier = Modifier.height(8.dp))
            Text(text = product.price.localizedString)
            Spacer(modifier = Modifier.height(16.dp))
            Button(onClick = {
                if (activity != null) {
                    Adapty.makePurchase(activity, product, null, false) { response ->
                        when (response) {
                            is AdaptyResult.Success -> {
                                // Handle success
                                val purchasedInfo = response.value
                                if (purchasedInfo != null) {
                                    val profile = purchasedInfo.profile
                                    Toast.makeText(activity, profile.toString(), Toast.LENGTH_SHORT)
                                        .show()
                                }
                                Toast.makeText(activity, "Purchase successful", Toast.LENGTH_SHORT)
                                    .show()
                            }

                            is AdaptyResult.Error -> {
                                // Handle error
                                Toast.makeText(activity, "Purchase failed", Toast.LENGTH_SHORT)
                                    .show()
                            }
                        }
                    }
                }

            }) {
                Text(text = "Buy")
            }
        }
    }
}

private fun fetchPaywallAndProducts(
    placementId: String,
    paywallState: MutableState<AdaptyPaywallProduct?>,
    productsState: MutableState<List<AdaptyPaywallProduct>?>,
    errorState: MutableState<String?>,
    isLoading: MutableState<Boolean>
) {
    Adapty.getPaywall(placementId) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val paywall = result.value

                Adapty.getPaywallProducts(paywall) { productResult ->
                    isLoading.value = false

                    when (productResult) {
                        is AdaptyResult.Success -> {
                            productsState.value = productResult.value
                            Adapty.logShowPaywall(paywall)
                        }

                        is AdaptyResult.Error -> {
                            errorState.value = productResult.error.message
                        }
                    }
                }
            }

            is AdaptyResult.Error -> {
                errorState.value = result.error.message
                isLoading.value = false
            }
        }
    }
}
