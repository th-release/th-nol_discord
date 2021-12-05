import Command from '../interfaces/Command'
import { I, D } from '../aliases/discord.js.js'
import { db } from '../variable/database'

export default class RegisterCommand implements Command {
  /** 실행되는 부분입니다. */
  async run (interaction: I) {
    const [user] = await db.select('*').from('users').where('userid', interaction.user.id)
    if (!user) {
      await db.insert({ userid: interaction.user.id }).into('users')
      await interaction.editReply('가입이 완료되었습니다.')
    } else {
      await interaction.editReply('이미 가입하신적이 있는 계정 입니다.')
    }
  }

  /** 해당 명령어의 대한 설정입니다. */
  metadata = <D>{
    name: '가입',
    description: '계정 가입'
  }
}
