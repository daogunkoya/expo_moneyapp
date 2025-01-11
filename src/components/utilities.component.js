export const userAsSender =  user => {
        return {
            senderId: user.userId,
            senderFname: user.userFname,
            senderLname: user.userLname,
            senderEmail: user.userEmail,
            senderRole: user.userRole,
        }
  }
