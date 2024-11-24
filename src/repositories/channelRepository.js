import Channel from '../schema/channel.js';
import crudRepository from './crudReository.js';

const channelRepository = {
  ...crudRepository(Channel),
  getChannelWithWorkSpaceDetails: async function (channelId) {
    const channel = await Channel.findById(channelId).populate('workspaceId');
    return channel;
  }
};

export default channelRepository;
