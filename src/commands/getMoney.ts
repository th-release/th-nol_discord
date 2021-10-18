import Command from '../interfaces/Command'
import { I, D } from '../aliases/discord.js.js'
import { db } from '../variable/database'

/** 핑 명령어 */
export default class GetMoneyCommand implements Command {
  /** 실행되는 부분입니다. */
  async run (interaction: I) {
    const [user] = await db.select('*').from('users').where('userid', interaction.user.id)
    const randomMoney = Math.floor(Math.random() * (10000 - 4000) + 4000)
    if (!user) {
      await interaction.editReply('가입하신적이 없는 계정 입니다. `/가입`을 사용하셔서 가입을 완료해 주세요!')
    } else {
      if ((Date.now() / 1000) > user.cooltime + 60) {
        await db.update({ money: user.money + randomMoney, cooltime: Date.now() / 1000 }).where('userid', interaction.user.id).from('users')
        await interaction.editReply('성공! 요청하신`' + randomMoney + '원`가 지원 되었습니다.`+' + randomMoney + '원`')
      } else {
        await interaction.editReply('실패.. 아직 쿨타임이 있어요..!`남은 쿨타임 : ' + Math.floor(user.cooltime - (Date.now() / 1000 - 60)) + '초`')
      }
    }
  }

  /** 해당 명령어의 대한 설정입니다. */
  metadata = <D>{
    name: '돈받기',
    description: '돈 지원!'
  }
}
