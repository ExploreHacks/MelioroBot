import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';
import { addHoursToUser } from '../../lib/google-sheets/hours-backend';

@ApplyOptions<CommandOptions>({
	description: 'adds hours to a single user',
	aliases: ['ahu']
})
export class AddUserHours extends Command {
	public async messageRun(message: Message, args: Args) {
		const user = await args.pick('user');
		const hours = await args.pick('number');
                const reason = await args.rest('string');

                this.container.logger.trace(`Adding ${hours} to ${user.username} because they did ${reason}`)
                
		addHoursToUser(user, hours, reason, message, );
		send(message, 'user hours successfully added');
	}
}
