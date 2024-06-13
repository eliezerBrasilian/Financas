package com.ifinancas.dependecyInjection

import android.content.Context
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.ifinancas.services.AuthService
import com.ifinancas.services.impl.AuthServiceImpl
import com.ifinancas.services.DateTimeService
import com.ifinancas.services.FinancialOperationsService
import com.ifinancas.services.InterstitialAdsService
import com.ifinancas.services.UserService
import com.ifinancas.services.impl.DateTimeServiceImpl
import com.ifinancas.services.impl.FinancialOperationsServiceImpl
import com.ifinancas.services.impl.IntersititialAdsServiceImpl
import com.ifinancas.services.impl.UserServiceImpl
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideFirebaseAuth(): FirebaseAuth {
        return FirebaseAuth.getInstance()
    }

    @Provides
    @Singleton
    fun provideFirebaseFirestore(): FirebaseFirestore {
        return FirebaseFirestore.getInstance()
    }

    @Provides
    @Singleton
    fun provideAuthRepository(
        auth: FirebaseAuth,
        firestore: FirebaseFirestore
    ): AuthService {
        return AuthServiceImpl(auth, firestore)
    }

    @Provides
    @Singleton
    fun provideDateTimeService(): DateTimeService {
        return DateTimeServiceImpl()
    }

    @Provides
    @Singleton
    fun provideFinancialOperationsService(firestore: FirebaseFirestore,
                                          dateTimeService: DateTimeService):FinancialOperationsService{
        return FinancialOperationsServiceImpl(firestore,dateTimeService)
    }

    @Provides
    @Singleton
    fun provideUserService(@ApplicationContext context: Context): UserService {
        return UserServiceImpl(context)
    }

    @Provides
    @Singleton
    fun provideInterstitialAdsService(@ApplicationContext context: Context):InterstitialAdsService{
        return IntersititialAdsServiceImpl(context)
    }
}
