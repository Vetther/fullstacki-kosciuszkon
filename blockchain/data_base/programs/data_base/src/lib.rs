use anchor_lang::prelude::*;

declare_id!("83aMjCUBPTMLcJKZ9KUowaHREGrm5vMXbjPPW3arWUM4");

#[program]
pub mod data_base {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
