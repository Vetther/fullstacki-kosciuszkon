use anchor_lang::prelude::*;

declare_id!("83aMjCUBPTMLcJKZ9KUowaHREGrm5vMXbjPPW3arWUM4");

#[program]
pub mod data_base {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, message: String) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.message = message;
        msg!("Saved message!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 4 + 280)] // 8 bytes for discriminator, 4 for string length prefix, 280 for max string
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct BaseAccount {
    pub message: String,
}
