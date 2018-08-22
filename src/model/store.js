export default [
  {
    id: 1,
    title: 'How do I delete a Git branch both locally and remotely?',
    context: 'I want to delete a branch both locally and on my remote project fork on GitHub.',
    answers: [
      {
        id: 1,
        answer: 'To delete the local branch use git branch -d branch_name',
        createdAt: '2018-08-21 14:55:01',
      },
      {
        id: 2,
        answer: 'You could also use -D, which is an alias for --delete --force, which deletes the branch "irrespective of its merged status."',
        createdAt: '2018-08-21 15:55:01',
      },
    ],
    selected: 1,
    createdAt: '2018-08-21 14:54:47',
    updatedAt: null,
  },
  {
    id: 2,
    title: 'How to clone all remote branches in Git?',
    context: 'I have a master and a development branch, both pushed to GitHub. I have cloned, pulled, and fetched, but I remain unable to get anything other than the master branch back.',
    answers: [
      {
        id: 1,
        answer: 'git branch -a shows you the branches in the remote, but if you attempt to check any of those out you will be in a detached HEAD state.',
        createdAt: '2018-08-26 18:55:01',
      },
      {
        id: 2,
        answer: 'Rather than saying "I have cloned, pulled, and fetched," much better to show us the exact commands that you executed.',
        createdAt: '2018-08-26 19:55:01',
      },
    ],
    selected: null,
    createdAt: '2018-08-26 18:54:47',
    updatedAt: null,
  },
];
