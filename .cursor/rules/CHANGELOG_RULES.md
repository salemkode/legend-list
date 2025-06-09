# Changelog Update Rules

## Process for Adding Git Changes to Changelog

When updating the changelog with recent git commits, follow these guidelines:

### 1. Identify Relevant Commits
- Get all commits since the last version using: `git log --oneline --since="$(git log --grep="X.X.X" --format="%cd" --date=iso | head -1)" --reverse`
- Exclude non-user-facing commits like:
  - "Update changelog"
  - "chore:" commits
  - Internal refactoring that doesn't affect API
  - "Refactor*" commits

### 2. Categorize Changes
Organize changes by type with these prefixes:
- **Fix:** Bug fixes and corrections
- **Feat:** New features and capabilities
- **Refactor:** API changes and restructuring (user-facing)
- **Perf:** Performance improvements
- **Improvement:** Enhancements to existing functionality

### 3. Format Guidelines
- Write user-friendly descriptions, not raw commit messages
- Focus on the impact/benefit to users
- Be concise but descriptive
- Use present tense ("Fix X" not "Fixed X")
- Group similar changes together when possible

### 4. Version Organization
- Add changes to the current version in package.json
- If significant changes warrant a new version, bump version first
- List most important changes (breaking changes, major features) first
- Group fixes and minor improvements at the end

### 5. Example Format
```markdown
## X.X.X
- Fix: [Issue description and impact]
- Fix: [Another bug fix]
- Feat: [New feature description]
- Refactor: [API change description]
- Perf: [Performance improvement description]
- Improvement: [Enhancement description]
```

### 6. Quality Check
- Ensure all user-facing changes are documented
- Verify technical accuracy of descriptions
- Check that breaking changes are clearly marked
- Review for consistency in tone and format