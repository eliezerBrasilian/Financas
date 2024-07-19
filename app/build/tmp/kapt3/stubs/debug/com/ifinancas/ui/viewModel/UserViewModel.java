package com.ifinancas.ui.viewModel;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.ViewModel;
import com.ifinancas.services.UserService;
import dagger.hilt.android.lifecycle.HiltViewModel;
import javax.inject.Inject;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000.\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\u0010\u000e\n\u0002\b\t\n\u0002\u0010\u0002\n\u0002\b\u0005\n\u0002\u0018\u0002\n\u0002\b\u0004\b\u0007\u0018\u00002\u00020\u0001B\u000f\b\u0007\u0012\u0006\u0010\u0002\u001a\u00020\u0003\u00a2\u0006\u0002\u0010\u0004J\u0006\u0010\u0010\u001a\u00020\u0011J\u000e\u0010\u0012\u001a\u00020\u00112\u0006\u0010\u0005\u001a\u00020\u0007J\u000e\u0010\u0013\u001a\u00020\u00112\u0006\u0010\n\u001a\u00020\u0007J\u000e\u0010\u0014\u001a\u00020\u00112\u0006\u0010\f\u001a\u00020\u0007J\u000e\u0010\u0015\u001a\u00020\u00112\u0006\u0010\u000e\u001a\u00020\u0007J \u0010\u0016\u001a\u00020\u00172\b\u0010\u0018\u001a\u0004\u0018\u00010\u00072\u0006\u0010\u0019\u001a\u00020\u00072\u0006\u0010\u001a\u001a\u00020\u0007R\u0019\u0010\u0005\u001a\n\u0012\u0006\u0012\u0004\u0018\u00010\u00070\u0006\u00a2\u0006\b\n\u0000\u001a\u0004\b\b\u0010\tR\u0019\u0010\n\u001a\n\u0012\u0006\u0012\u0004\u0018\u00010\u00070\u0006\u00a2\u0006\b\n\u0000\u001a\u0004\b\u000b\u0010\tR\u0019\u0010\f\u001a\n\u0012\u0006\u0012\u0004\u0018\u00010\u00070\u0006\u00a2\u0006\b\n\u0000\u001a\u0004\b\r\u0010\tR\u0019\u0010\u000e\u001a\n\u0012\u0006\u0012\u0004\u0018\u00010\u00070\u0006\u00a2\u0006\b\n\u0000\u001a\u0004\b\u000f\u0010\tR\u000e\u0010\u0002\u001a\u00020\u0003X\u0082\u0004\u00a2\u0006\u0002\n\u0000\u00a8\u0006\u001b"}, d2 = {"Lcom/ifinancas/ui/viewModel/UserViewModel;", "Landroidx/lifecycle/ViewModel;", "userService", "Lcom/ifinancas/services/UserService;", "(Lcom/ifinancas/services/UserService;)V", "email", "Landroidx/lifecycle/LiveData;", "", "getEmail", "()Landroidx/lifecycle/LiveData;", "name", "getName", "photo", "getPhoto", "uid", "getUid", "clearAllData", "", "saveEmail", "saveName", "savePhoto", "saveUid", "updateProfilePicture", "Lkotlinx/coroutines/Job;", "oldProfilePictureReferenceUrl", "newProfilePicture", "userUid", "app_debug"})
@dagger.hilt.android.lifecycle.HiltViewModel
public final class UserViewModel extends androidx.lifecycle.ViewModel {
    @org.jetbrains.annotations.NotNull
    private final com.ifinancas.services.UserService userService = null;
    @org.jetbrains.annotations.NotNull
    private final androidx.lifecycle.LiveData<java.lang.String> email = null;
    @org.jetbrains.annotations.NotNull
    private final androidx.lifecycle.LiveData<java.lang.String> name = null;
    @org.jetbrains.annotations.NotNull
    private final androidx.lifecycle.LiveData<java.lang.String> uid = null;
    @org.jetbrains.annotations.NotNull
    private final androidx.lifecycle.LiveData<java.lang.String> photo = null;
    
    @javax.inject.Inject
    public UserViewModel(@org.jetbrains.annotations.NotNull
    com.ifinancas.services.UserService userService) {
        super();
    }
    
    @org.jetbrains.annotations.NotNull
    public final androidx.lifecycle.LiveData<java.lang.String> getEmail() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final androidx.lifecycle.LiveData<java.lang.String> getName() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final androidx.lifecycle.LiveData<java.lang.String> getUid() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final androidx.lifecycle.LiveData<java.lang.String> getPhoto() {
        return null;
    }
    
    public final void saveEmail(@org.jetbrains.annotations.NotNull
    java.lang.String email) {
    }
    
    public final void saveName(@org.jetbrains.annotations.NotNull
    java.lang.String name) {
    }
    
    public final void saveUid(@org.jetbrains.annotations.NotNull
    java.lang.String uid) {
    }
    
    public final void savePhoto(@org.jetbrains.annotations.NotNull
    java.lang.String photo) {
    }
    
    public final void clearAllData() {
    }
    
    @org.jetbrains.annotations.NotNull
    public final kotlinx.coroutines.Job updateProfilePicture(@org.jetbrains.annotations.Nullable
    java.lang.String oldProfilePictureReferenceUrl, @org.jetbrains.annotations.NotNull
    java.lang.String newProfilePicture, @org.jetbrains.annotations.NotNull
    java.lang.String userUid) {
        return null;
    }
}